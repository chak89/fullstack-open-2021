import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_AUTHOR_BIRTHYEAR } from '../queries'

const Authors = (props) => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	
	//Updating the cache: use the useMutation hook's refetchQueries parameter to define that the query fetching all authors to be done again after setAuthorBirthyear
	const [setAuthorBirthyear] = useMutation(SET_AUTHOR_BIRTHYEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }]
	})

	if (!props.show) {
		return null
	}

	const submit = async (event) => {
		event.preventDefault()
		//Mutations that uses varaibles
		setAuthorBirthyear({ variables: { name, born } })
		console.log('updated author...')
		setName('')
		setBorn('')
	}

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
				<form onSubmit={submit}>
					<div>
						name:
						<input
							value={name}
							onChange={(event) => setName(event.target.value)}
						/>
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
