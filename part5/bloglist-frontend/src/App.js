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

	//Check if user detailed of a logged-in user can already found on the local storage after refresh
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')

		if(loggedUserJSON) {
			const loggedInUser = JSON.parse(loggedUserJSON)
			setUser(loggedInUser)
		}

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

		//Set user state and clear fields
		setUsername('')
		setPassword('')

		if (respondedUser !== null) {
			setUser(respondedUser)
			//Saving the token to the browser's local storage
			window.localStorage.setItem(
				'loggedInBlogUser', JSON.stringify(respondedUser)
			)
		}
	}

	const handleLogout = (e) =>{
		e.preventDefault();
		window.localStorage.clear();
		setUser(null)
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
					<p>{user.name} logged in<button type="submit" onClick={handleLogout}>Logout</button></p> 
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