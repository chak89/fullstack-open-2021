import React, { useState } from 'react'
import { useField, useCountry } from './hooks/index'

const Country = ({ country }) => {

	if (!country) {
		return null
	}

	if (country.data.message === 'Not Found') {
		return (
			<div>
				not found...
			</div>
		)
	}

	console.log('Country -> country:', country)

	return (
		<div>
			<h3>{country.data[0].name} </h3>
			<div>capital {country.data[0].capital} </div>
			<div>population {country.data[0].population}</div>
			<img src={country.data[0].flag} height='100' alt={`flag of ${country.data.name}`} />
		</div>
	)
}

const App = () => {
	const nameInput = useField('text')
	const [name, setName] = useState('')
	const country = useCountry(name)

	const fetch = (e) => {
		e.preventDefault()
		setName(nameInput.value)
	}

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country} />
		</div>
	)
}

export default App
