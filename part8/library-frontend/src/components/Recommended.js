import React, { useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, FAVORITE_BOOKS } from '../queries'

const Recommended = (props) => {
	const loadCurrentUser = useQuery(ME, {
		skip: props.token === null
	})

	//useLazyQuery provides a function to call at will
	const [loadFavoriteGenre, favoriteGenre] = useLazyQuery(FAVORITE_BOOKS)

	if (!props.show) {
		return null
	}
	console.log('Visiting Recommended')

	if (!loadCurrentUser.loading) {
		console.log('loadCurrentUser.data:', loadCurrentUser.data)
	}

	if (!favoriteGenre.called) {
		loadFavoriteGenre({ variables: { favoriteGenre: loadCurrentUser.data.me.favoriteGenre } })
		return <div>Loading favorite books</div>
	}

	if (!favoriteGenre.data) {
		return <div>Waiting for favorite books</div>
	}

	console.log('loadCurrentUser() -> favoriteGenre.data.allBooks:', favoriteGenre.data.allBooks)

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
						{favoriteGenre.data.allBooks
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