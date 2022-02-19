
import React, { useEffect, useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'
import Login from './components/Login'
import Recommended from './components/Recommended'

const App = () => {
	const [page, setPage] = useState('')
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	//useQuery called during render
	const resultAuthors = useQuery(ALL_AUTHORS)
	const resultBooks = useQuery(ALL_BOOKS)


	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			console.log('subscriptionData:', subscriptionData)
			let book = subscriptionData.data.bookAdded
			let text = `New book added!\nTitle: ${book.title}\nAuthor: ${book.author.name}\nPublished: ${book.published}\nGenres ${book.genres}`
			window.alert(text)
		}
	})


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
		console.log('User logged out')
		window.location.reload()
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
				token={token}
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