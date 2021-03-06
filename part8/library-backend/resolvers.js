const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = '123456Password'

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
			console.log('Query -> me: -> context.currentUser:', context.currentUser)
			return context.currentUser
		}
	},
	/* ---------------------- Custom resolver fields -------------------------- */
	Author: {
		//Get current Author _id and match against Books
		bookCount: async (root) => root.books.length
	},
	Book: {
		//Book author must exist, otherwise null will be returned
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

			let author = await Author.findOne({ name: args.author })
			let book = new Book({ ...args })

			//If author doesn't exist, create author
			if (!author) {
				console.log(`Author ${args.author} doesnt exist in the database`)
				author = new Author({ name: args.author, books: [book._id] })
			} else {
				console.log(`Author ${args.author} exist in the database`)
				author.books = author.books.concat(book._id)
			}

			let addedBook
			//Saving author and books to database
			try {
				await author.save()
				book.author = author._id
				addedBook = await book.save()

			} catch (error) {
				console.log(error.message)
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
			pubsub.publish('BOOK_ADDED', { bookAdded: addedBook })
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
	},
	Subscription: {
		bookAdded: {
			subscribe: () => {
				console.log('Subscription -> bookAdded -> subscribe')
				return pubsub.asyncIterator(['BOOK_ADDED'])
			}
		}
	},
}

module.exports = resolvers