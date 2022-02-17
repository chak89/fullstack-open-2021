const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const config = require('./utils/config')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')

let { authors, books } = require('./utils/initList')

console.log('connecting to', config.MONGODB_URI)

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

	/* 	await Author.deleteMany({})
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
		console.log('Saved books to database:') */
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
	}

  type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author]!
  }
`

const resolvers = {
	Query: {
		bookCount: () => books.length,
		authorCount: () => authors.length,
		allBooks: (root, args) => {

			//If both optional parameters are null
			if (!args.author && !args.genre) {
				return books
			}

			let filteredBooks = books

			if (args.author) {
				filteredBooks = filteredBooks.filter(b => b.author === args.author)
			}

			if (args.genre) {
				filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
			}

			return filteredBooks
		},
		allAuthors: () => authors
	},
	Author: {
		bookCount: (root) => books.filter(b => b.author === root.name).length
	},
	Book: {
		author: async (root) => await Author.findById(root.author)
	},
	Mutation: {
		//Save book to the database, if the author is not yet saved to the database, a new author is added to the database. 
		addBook: async (root, args) => {
			console.log('Mutation -> addBook()')

			let foundAuthor = await Author.findOne({ name: args.author })

			if (!foundAuthor) {
				console.log(`Author ${args.author} doesnt exist in the database`)
				const author = {
					name: args.author,
				}

				foundAuthor = await new Author(author).save()
				console.log(`Added author: ${JSON.stringify(author)} to the database`)
				console.log(`Fetched author: ${foundAuthor} from the database`)
			} else {
				console.log('Found author in database: ', foundAuthor)
			}

			const book = new Book({ ...args, author: foundAuthor._id })
			console.log(`Adding book: ${JSON.stringify(book)} to the database\n`)
			return book.save()
		},
		// Update the birthyear of the author
		editAuthor: async (root, args) => {
			console.log('Mutation -> editAuthor()')

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
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})