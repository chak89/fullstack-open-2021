const LoginForm = (props) => {
	const { user, username, setUsername, password, setPassword, handleLogin } = props

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type="text"
							value={username}
							name="Username"
							onChange={(event => setUsername(event.target.value))}
						/>
					</div>
					<div>
						password
						<input
							type="password"
							value={password}
							name="Password"
							onChange={(event => setPassword(event.target.value))}
						/>
					</div>
					<button type="submit">login</button>
				</form>
			</div>
		)
	}
}

export default LoginForm
