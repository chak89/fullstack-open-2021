
import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Login from './components/Login'
import Recommended from './components/Recommended'

const App = () => {
	const [page, setPage] = useState('')
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	//useQuery called during render
	const resultAuthors = useQuery(ALL_AUTHORS)
	const resultBooks = useQuery(ALL_BOOKS)



	useEffect(() => {
		const tokenInCache = localStorage.getItem('LoggedInUser')
		if (tokenInCache) {
			setToken(tokenInCache)
		}
	}, [])

	if (resultAuthors.loading || resultBooks.loading) {
		return <div>loading......</div>
	}

	if (!resultAuthors.loading) {
		console.log('resultAuthors:', resultAuthors)
	}

	if (!resultBooks.loading) {
		console.log('resultBooks:', resultBooks)
	}

	const loggedInView = () => {
		return (
			<>
				<button onClick={() => setPage('add')}>Add book</button>
				<button onClick={() => setPage('recommended')}>Recommended</button>
				<button onClick={logout}>Logout</button>
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
				<button onClick={() => setPage('authors')}>Authors</button>
				<button onClick={() => setPage('books')}>Books</button>
				{token === null
					?
					<button onClick={() => setPage('login')}>Login</button>
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

			<Recommended
				show={page === 'recommended'}
				books={resultBooks.data.allBooks}
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