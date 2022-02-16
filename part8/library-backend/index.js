const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
	{
		name: 'Robert Martin',
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'crime']
	},
	{
		title: 'The Demon ',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'revolution']
	},
]

const typeDefs = gql`
	type Books {
		title: String!
		published: Int!
		author: String!
		id: String!
		genres: [String]!
	}
	
	type Authors {
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
		): Books
		editAuthor(
			name: String!
			setBornTo: Int!
		): Authors
	}

  type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Books!]!
		allAuthors: [Authors]!
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
	Authors: {
		bookCount: (root) => books.filter(b => b.author === root.name).length
	},
	//Save book to the server, if the author is not yet saved to the server, a new author is added to the system. 
	Mutation: {
		addBook: (root, args) => {
			console.log('Mutation -> addBook()')
			const foundAuthor = authors.find(a => a.name === args.author)

			if (!foundAuthor) {
				console.log(`Author ${args.author} doesnt exist in the system`)
				const author = {
					name: args.author,
					id: uuid()
				}

				authors = authors.concat(author)
				console.log(`Added author: ${JSON.stringify(author)} to the system`)
			}

			const book = { ...args, id: uuid() }
			books = books.concat(book)
			console.log(`Added book: ${JSON.stringify(book)} to the system\n`)
			return book
		},
		editAuthor: (root, args) => {
			console.log('Mutation -> editAuthor()')
			const foundAuthor = authors.find(a => a.name === args.name)

			if (!foundAuthor) {
				console.log(`Author ${args.name} doesnt exist in the system`)
				return null
			}

			const updatedAuthor = { ...foundAuthor, born: args.setBornTo }
			authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
			console.log(`Updated author to: ${JSON.stringify(updatedAuthor)} in the system\n`)
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