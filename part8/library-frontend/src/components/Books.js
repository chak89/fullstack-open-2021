import React, { useState } from 'react'

const Books = (props) => {

	const [genre, setGenre] = useState('')

	if (!props.show) {
		return null
	}

	//Flatten inner arrays and place into Set to get unique genres
	const renderGenres = () => {
		let uniqueGenres = []
		props.books.forEach(b => uniqueGenres.push(b.genres))
		uniqueGenres = new Set(uniqueGenres.flat())
		return Array.from(uniqueGenres).map((g) => <button key={g} onClick={() => setGenre(g)}>{g}</button>)
	}

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
					{props.books.filter(a => {
						if (genre === '') {
							return true
						}
						return a.genres.includes(genre)
					})
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
			{
				renderGenres()
			}
		</div>
	)
}

export default Books