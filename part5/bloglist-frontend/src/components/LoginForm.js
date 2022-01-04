const LoginForm = (props) => {
	const { user } = props

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<form>
					<div>
						username
						<input
							type="text"
							value={null}
							name="Username"
							onChange={null}
						/>
					</div>
					<div>
						password
						<input
							type="password"
							value={null}
							name="Password"
							onChange={null}
						/>
					</div>
				</form>
			</div>
		)
	}
}

export default LoginForm
