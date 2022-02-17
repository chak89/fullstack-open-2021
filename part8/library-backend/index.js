const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const config = require('./utils/config')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

//let { authors, books } = require('./utils/initList')

console.log('connecting to', config.MONGODB_URI)

const JWT_SECRET = '123456Password'

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
		console.log('Initialised authors:')
		console.log('Initialised books:')
		saveToDB()
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const saveToDB = async () => {
	/*
				await Author.deleteMany({})
			await Book.deleteMany({})
		
				console.log('Saving authors to database:')
			authors.forEach(async (a) => {
				await new Author(a).save()
			})
			console.log('Saved authors to database:') 
		
			console.log('Initialised books:')
			console.log('Saving authors to database:')
		
			books.forEach(async (b) => {
				await new Book(b).save()
			})
			console.log('Saved books to database:') 
			*/
}

const typeDefs = gql`
	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String]!
		id: ID!
	}
	
	type Author {
		name: String!
		id: String!
		born: Int
		bookCount: Int
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}
	
	type Token {
		value: String!
	}
	
	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String]!
		): Book
		editAuthor(
			name: String!
			setBornTo: Int!
		): Author
		createUser(
			username: String!
			favoriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
	}

  type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author]!
		me: User
  }
`

const resolvers = {
	/* ------------------------------- Queries -------------------------------- */
	Query: {
		bookCount: async () => await Book.collection.countDocuments(),
		authorCount: async () => await Author.collection.countDocuments(),
		allBooks: async (root, args) => {

			//If both optional parameters are null
			if (!args.author && !args.genre) {
				return await Book.find()
			}
			if (args.author) {
				console.log('allBooks with the parameter author doesnt work')
				return null
			}

			if (args.genre) {
				return await Book.find({ genres: { $in: [args.genre] } })
			}
		},
		allAuthors: async () => await Author.find(),
		me: (root, args, context) => {
			return context.currentUser
		}
	},
	/* ---------------------- Custom resolver fields -------------------------- */
	Author: {
		//Get current Author _id and match against Books
		bookCount: async (root) => {
			const matchedBook = await Book.find({ author: { $in: root._id } })
			return matchedBook.length
		}
	},
	Book: {
		author: async (root) => await Author.findById(root.author)
	},
	/* ------------------------------- Mutations ------------------------------ */
	Mutation: {
		//Save book to the database, if the author is not yet saved to the database, a new author is added to the database. 
		addBook: async (root, args, context) => {
			console.log('Mutation -> addBook()')

			//Check if a logged-in user can be found from the context
			const currentUser = context.currentUser
			if (!currentUser) {
				console.log('not authenticated')
				throw new AuthenticationError('not authenticated')
			}

			let foundAuthor = await Author.findOne({ name: args.author })

			if (!foundAuthor) {
				console.log(`Author ${args.author} doesnt exist in the database`)
				const author = {
					name: args.author,
				}

				try {
					foundAuthor = await new Author(author).save()
					console.log(`Added author: ${JSON.stringify(author)} to the database`)
					console.log(`Fetched author: ${foundAuthor} from the database`)
				} catch (error) {
					console.log(error.message)
					throw new UserInputError(error.message, {
						invalidArgs: args,
					})
				}
			} else {
				console.log('Found author in database: ', foundAuthor)
			}

			const book = new Book({ ...args, author: foundAuthor._id })
			let addedBook
			try {
				console.log(`Adding book: ${JSON.stringify(book)} to the database\n`)
				addedBook = await book.save()
				console.group('addedBook to database')
			} catch (error) {
				console.log(error.message)
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}

			return addedBook
		},
		// Update the birthyear of the author
		editAuthor: async (root, args, context) => {
			console.log('Mutation -> editAuthor()')

			//Check if a logged-in user can be found from the context
			const currentUser = context.currentUser
			if (!currentUser) {
				console.log('not authenticated')
				throw new AuthenticationError('not authenticated')
			}

			let foundAuthor = await Author.findOne({ name: args.name })

			if (!foundAuthor) {
				console.log(`Author ${args.name} doesnt exist in the system`)
				return null
			}

			const updateBorn = { born: args.setBornTo }

			console.log('Found author in database: ', foundAuthor)
			console.log('Updating author: ')
			// { new: true } so the returned document is a updated one
			const updatedAuthor = await Author.findByIdAndUpdate(foundAuthor._id, updateBorn, { new: true })
			console.log(`Updated author: ${updatedAuthor} to the database\n`)
			return updatedAuthor
		},
		//Create a new user
		createUser: async (root, args) => {
			console.log('Mutation -> createUser()')

			try {
				const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
				return await user.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
		},
		//Log in
		login: async (root, args) => {
			console.log('Mutation -> login()')
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new UserInputError('wrong credentials')
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, JWT_SECRET) }
		}
	}
}

const context = async ({ req }) => {
	const auth = req ? req.headers.authorization : null
	if (auth && auth.toLowerCase().startsWith('bearer ')) {
		console.log('context() -> decoding token.....')
		//		try {
		const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
		console.log('context() -> fetching currentUser:')
		const currentUser = await User.findById(decodedToken.id)
		console.log('context() -> currently logged-in/authorized user is currentUser:', currentUser)
		return { currentUser }
		//		} catch (error) {
		//			console.error('error:', error)
		//		return error
		//		}
	}
}

// Constructor
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})