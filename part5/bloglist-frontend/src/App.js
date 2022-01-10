import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	const [allBlogs, setAllBlogs] = useState([])
	const [userBlogs, setUserBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [notifications, setNotifications] = useState(null)
	const [reRender, setRerender] = useState(false)

	const createBlogFormRef = useRef()

	//Fetch all blogs once at start
	useEffect(() => {
		blogService.getAll().then(blogs =>
			setAllBlogs(blogs)
		)
	}, [reRender])


	useEffect(() => {
		if (user != null) {
			const result = allBlogs
				.filter((blog) => blog.user.username === user.username)
				.map((blog) => <Blog key={blog.id} blog={blog} />)
			setUserBlogs(result)
		}
	}, [allBlogs, user])


	//Check if user detailed of a logged-in user can already found on the local storage after refresh
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')

		if (loggedUserJSON) {
			const loggedInUser = JSON.parse(loggedUserJSON)
			setUser(loggedInUser)
			blogService.setToken(loggedInUser.token)
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
			blogService.setToken(respondedUser.token)
			//Saving the token to the browser's local storage
			window.localStorage.setItem(
				'loggedInBlogUser', JSON.stringify(respondedUser)
			)
		} else {
			setNotifications([`red`, `wrong username or password`])
			setTimeout(() => {
				setNotifications(null)
			}, 5000)
		}
	}

	//Handles log out
	const handleLogout = (e) => {
		e.preventDefault();
		window.localStorage.clear();
		setUser(null)
		blogService.setToken(null)
	}

	//Handles create new blog
	const handleCreateBlog = async (e) => {
		e.preventDefault();

		const newBlog =
		{
			"title": e.target.title.value,
			"author": e.target.author.value,
			"url": e.target.linkurl.value || ' '
		}

		
		try {
			const createdBlog = await blogService.create(newBlog)
			console.log('createdBlog', createdBlog)
			setRerender(!reRender)
			createBlogFormRef.current.toggleVisibility()

			setNotifications([`green`, `a new blog ${e.target.title.value} by ${e.target.author.value} added`])
			setTimeout(() => {
				setNotifications(null)
			}, 5000)
		} catch (error) {
			setNotifications([`red`, `Error creating new blog`])
			setTimeout(() => {
				setNotifications(null)
			}, 5000)
		}
	}

	return (
		<div>
			{user === null ?
				<>
					<h2>Log in to application</h2>
					<Notification notifications={notifications} />
					<Togglable buttonLabel='login'>
						<LoginForm
							user={user}
							username={username}
							setUsername={setUsername}
							password={password}
							setPassword={setPassword}
							handleLogin={handleLogin}
						/>
					</Togglable>
				</>
				:
				<>
					<h2>Blogs</h2>
					<Notification notifications={notifications} />
					<p>{user.name} logged in<button type="submit" onClick={handleLogout}>Logout</button></p>
					<Togglable buttonLabel='createNewBlog' ref={createBlogFormRef}>
						<CreateBlogForm handleCreateBlog={handleCreateBlog} />
					</Togglable>
					<br />
					{userBlogs}
				</>
			}
		</div>
	)
}

export default App