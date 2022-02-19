import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { FAVORITE_BOOKS } from '../queries'

const Books = (props) => {
	console.log('Books -> props.books:', props.books)
	const [genre, setGenre] = useState('')

	const loadBooks = useQuery(FAVORITE_BOOKS, {
		variables: { favoriteGenre: genre },
	})

	if (!props.show) {
		return null
	}

	if (!loadBooks.loading) {
		console.log('loadBooks.data:', loadBooks.data)
	}

	if (!loadBooks.data) {
		return <div>Loading for books from server</div>
	}

	//Flatten inner arrays and place into Set to get unique genres
	const renderGenres = () => {
		let uniqueGenres = []
		props.books.forEach(b => uniqueGenres.push(b.genres))
		uniqueGenres = new Set(uniqueGenres.flat())
		return Array.from(uniqueGenres).map((g) => <button key={g} onClick={() => setGenre(g)}>{g}</button>)
	}

	console.log('loadBooks.refetch()')
	loadBooks.refetch()

	return (
		<div>
			<h2>books</h2>
			<p>In genre: <strong>{genre}</strong></p>
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
					{loadBooks.data.allBooks
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
			{renderGenres()}
		</div>
	)
}

export default Books