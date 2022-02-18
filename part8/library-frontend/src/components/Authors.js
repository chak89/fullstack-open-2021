import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_AUTHOR_BIRTHYEAR } from '../queries'

const Authors = (props) => {
	const [born, setBorn] = useState('')
	//Set the selected to the first element in list when the component is created instead so Select works when add default value
	const [name, setName] = useState(props.authors[0].name)

	//Updating the cache: use the useMutation hook's refetchQueries parameter to define that the query fetching all authors to be done again after setAuthorBirthyear
	const [setAuthorBirthyear] = useMutation(SET_AUTHOR_BIRTHYEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }]
	})

	if (!props.show) {
		return null
	}

	const handleChange = (event) => {
		setName(event.target.value)
	}

	const submitSetBirthyear = async (event) => {
		event.preventDefault()
		//Mutations that uses varaibles
		console.log('UPDATED AUTHOR:')
		console.log(`name: ${name} - born: ${born}`)
		setAuthorBirthyear({ variables: { name, born } })
		console.log('updated author...')
		setName('')
		setBorn('')
	}

	console.log('props.authors:', props.authors)

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
							born
						</th>
						<th>
							books
						</th>
					</tr>
					{props.authors.map(a =>
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					)}
				</tbody>
			</table>
			<div>
				<h2>Set birthyear</h2>
				<form onSubmit={submitSetBirthyear}>
					<div>
						name:
						<select value={name} onChange={handleChange}>
							{props.authors.map(a =>
								<option key={a.name} value={a.name}>{a.name}</option>
							)}
						</select>
					</div>
					<div>
						born:
						<input
							value={born}
							onChange={(event) => setBorn(parseInt(event.target.value))}
						/>
					</div>
					<button type='submit'>update author</button>
				</form>
			</div>
		</div>
	)
}

export default Authors
