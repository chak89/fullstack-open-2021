import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	//Fetch all blogs once at start
	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	//Run this when login buttion is clicked.
	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)

		const respondedUser = await loginService.login(
			{
				'username': username,
				'password': password
			}
		)
		console.log('respondedUser:', respondedUser)

		setUser(respondedUser)
		setUsername('')
		setPassword('')
	}

	return (
		<div>
			{user === null ?
				(<LoginForm
					user={user}
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
					handleLogin={handleLogin}
				/>)
				:
				<>
					<h2>Blogs</h2>
					<p>{user.name} logged in</p>
					{blogs.filter((blog) =>
						blog.user?.username === user.username)
						.map((blog) =>
							<Blog key={blog.id} blog={blog} />
						)
					}
				</>
			}
		</div>
	)
}

export default App