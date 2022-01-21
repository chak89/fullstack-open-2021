import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
	const { user, username, setUsername, password, setPassword, handleLogin } = props

	if (user === null) {
		return (
			<div>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							id='username'
							type="text"
							value={username}
							name="Username"
							onChange={(event => setUsername(event.target.value))}
						/>
					</div>
					<div>
						password
						<input
							id='password'
							type="password"
							value={password}
							name="Password"
							onChange={(event => setPassword(event.target.value))}
						/>
					</div>
					<button id='login-button' type="submit">login</button>
				</form>
			</div>
		)
	}
}

//Enforce mandatory props with PropTypes
LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	setUsername: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired,
	setPassword: PropTypes.func.isRequired,
	handleLogin: PropTypes.func.isRequired
}

export default LoginForm
