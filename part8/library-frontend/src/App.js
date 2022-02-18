
import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Login from './components/Login'

const App = () => {
	const [page, setPage] = useState('')
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	const resultAuthors = useQuery(ALL_AUTHORS)
	const resultBooks = useQuery(ALL_BOOKS)
	console.log('resultAuthors:', resultAuthors)
	console.log('resultBooks:', resultBooks)

	useEffect(() => {
		const tokenInCache = localStorage.getItem('LoggedInUser')
    if (tokenInCache) {
      setToken(tokenInCache)
    }
	})

	if (resultAuthors.loading || resultBooks.loading) {
		return <div>loading......</div>
	}

	const loggedInView = () => {
		return (
			<>
				<button onClick={() => setPage('add')}>add book</button>
				<button onClick={logout}>logout</button>
			</>
		)
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
		setPage('login')
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{token === null 
				?
				<button onClick={() => setPage('login')}>login</button>
				:
				loggedInView()
				}
			</div>

			<Authors
				show={page === 'authors'} authors={resultAuthors.data.allAuthors}
			/>

			<Books
				show={page === 'books'} books={resultBooks.data.allBooks}
			/>

			<NewBook
				show={page === 'add'}
			/>

			<Login
				show={page === 'login'}
				setToken={setToken}
				setPage={setPage}
			/>
		</div>
	)
}

export default App