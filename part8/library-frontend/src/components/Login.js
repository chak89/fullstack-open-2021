import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ show, setToken, setPage }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			//setError(error.graphQLErrors[0].message)
			console.log(error.graphQLErrors[0].message)
		}
	})

	useEffect(() => {
		if (result.data) {
			console.log('Successfull logged in')
			console.log('Token value:', result.data.login.value)
			const token = result.data.login.value

			setToken(token)
			localStorage.setItem('LoggedInUser', token)
			setPage('')
		}
	}, [result.data]) // eslint-disable-line

	if (!show) {
		return null
	}

	const handleLogin = async (event) => {
		event.preventDefault()

		login({ variables: { username, password } })
		console.log('Logging in......')

		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					Username:
					<input type='text'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					Password:
					<input type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}

export default Login