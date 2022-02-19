import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, FAVORITE_BOOKS } from '../queries'

const Recommended = (props) => {

	const loadCurrentUser = useQuery(ME, {
		skip: props.token === null
	})

	const favoriteBooks = useQuery(FAVORITE_BOOKS, {
		skip: !loadCurrentUser.data,
		variables: { favoriteGenre: loadCurrentUser.data ? loadCurrentUser.data.me.favoriteGenre : '' }
	})

	if (!props.show) {
		return null
	}
	console.log('Visiting Recommended')

	if (!loadCurrentUser.loading) {
		console.log('loadCurrentUser.data:', loadCurrentUser.data)
	}

	if (!favoriteBooks.data) {
		return <div>Waiting for favorite books</div>
	}

	//Refetch 
	favoriteBooks.refetch()
	console.log('Recommended.js -> favoriteBooks.refetch()')
	console.log('Recommended.js -> favoriteBooks.data.allBooks:', favoriteBooks.data.allBooks)

		return (
			<div>
				<h2>Recommended</h2>
				<p>Books in your favorite genre: <strong>{loadCurrentUser.data.me.favoriteGenre ? loadCurrentUser.data.me.favoriteGenre : null}</strong></p>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>
								author
							</th>
							<th>
								published
							</th>
						</tr>
						{favoriteBooks.data.allBooks
							.map(a =>
								<tr key={a.title}>
									<td>{a.title}</td>
									<td>{a.author.name}</td>
									<td>{a.published}</td>
								</tr>
							)
						}
					</tbody>
				</table>
			</div>
		) 
}

export default Recommended