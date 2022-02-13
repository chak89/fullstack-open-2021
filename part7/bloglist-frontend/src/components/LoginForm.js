import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { userLogin } from '../reducers/userReducer'
import {
	useNavigate
} from 'react-router-dom'

import {
	Button,
	TextField
} from '@mui/material'
//import PropTypes from 'prop-types'

const LoginForm = () => {
	const { reset: resetUserName, ...username } = useField('username', 'text')
	const { reset: resetPassword, ...password } = useField('password', 'password')

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.user)

	const handleLogin = async (event) => {
		event.preventDefault()

		console.log('username.value:', username.value)
		console.log('password.value:', password.value)

		dispatch(userLogin({
			'username': username.value,
			'password': password.value
		}))
			.then(result => result.type === 'USER_LOGIN' ? navigate('/users') : navigate('/'))

		resetUserName()
		resetPassword()
	}

	if (user === null) {
		return (
			<div>
				<form onSubmit={handleLogin}>
					<div>
						<TextField id="filled-basic" label="Username" variant="filled" name="Username" {...username} />
					</div>
					<div>
						<TextField id="outlined-password-input" label="Password" type="password" variant="filled" name="Password" {...password} />
					</div>
					<Button variant="contained" id='login-button' type="submit">login</Button>
				</form>
			</div>
		)
	} else {
		return (
			null
		)
	}
}

/* //Enforce mandatory props with PropTypes
LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	setUsername: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired,
	setPassword: PropTypes.func.isRequired,
	handleLogin: PropTypes.func.isRequired
} */

export default LoginForm
