import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
	allAuthors {
		name
		born
		bookCount
	}
}
`
export const ALL_BOOKS = gql`
query AllBooks {
  allBooks {
    title
    author {
			name
		}
    published
		genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author {
			name
		}
  }
}
`

export const SET_AUTHOR_BIRTHYEAR = gql`
mutation setAuthorBirthyear($name: String!, $born: Int!) {
	editAuthor(
		name: $name,
		setBornTo: $born
	) {
		name,
		born
	}
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) { 
  login(
		username: $username, 
		password: $password
	) {  
    value
	}
}
`

export const ME = gql`
query Me {
  me {
    username
    favoriteGenre
    id    
  }
}
`

export const FAVORITE_BOOKS = gql`
query favoriteBooks($favoriteGenre: String!) {
  allBooks(
		genre: $favoriteGenre
	) {
    title
    author {
			name
		}
    published
		genres
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
		bookAdded {
			title
			author {
				name
			}
			published
			genres
		}
  }
`