import React from 'react'
import { useLazyQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommended = (props) => {

	//useLazyQuery provides a function to call at will
	const [loadCurrentUser, { called, loading, data }] = useLazyQuery(ME)

	if (!props.show) {
		return null
	}

	if (called && loading) {
		return (
			<div>
				Loading info about currently logged in user......
			</div>
		)
	}

	if (!called) {
		loadCurrentUser()
		return <div>Loading user</div>
	}

	const favoriteGenre = data.me.favoriteGenre

	return (
		<div>
			<h2>Recommended</h2>
			<p>Books in your favorite genre: <strong>{favoriteGenre}</strong></p>
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
					{props.books.filter(a => a.genres.includes(favoriteGenre)
					)
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