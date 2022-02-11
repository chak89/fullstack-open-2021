import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { userLogin } from '../reducers/userReducer'
//import PropTypes from 'prop-types'

const LoginForm = () => {
	const { reset: resetUserName, ...username } = useField('username', 'text')
	const { reset: resetPassword, ...password } = useField('password', 'password')

	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const handleLogin = async (event) => {
		event.preventDefault()

		dispatch(userLogin({
			'username': username.value,
			'password': password.value
		}))
		resetUserName()
		resetPassword()
	}

	if (user === null) {
		return (
			<div>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input name="Username" {...username} />
					</div>
					<div>
						password
						<input name="Password" {...password} />
					</div>
					<button id='login-button' type="submit">login</button>
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
