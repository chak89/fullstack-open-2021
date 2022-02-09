import React, { useState, useEffect, useRef } from 'react'
import './App.css'
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


	//After user login, show only blogs created by such user.
	//Sort by likes in descending order.
	useEffect(() => {
		if (user !== null) {
			const result = allBlogs
				.filter((blog) => blog.user.username === user.username)
				.sort((a, b) => {
					return b.likes - a.likes
				})
				.map((blog) =>
					<Blog key={blog.id} blog={blog}
						handleIncreaseLike={handleIncreaseLike}
						handleRemoveBlog={handleRemoveBlog}
					/>)

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
		e.preventDefault()
		window.localStorage.clear()
		setUser(null)
		blogService.setToken(null)
	}


	//Handles create new blog
	const handleCreateBlog = async (blogObject) => {
		try {
			const createdBlog = await blogService.create(blogObject)
			console.log('createdBlog', createdBlog)
			setRerender(!reRender)

			setNotifications([`green`, `a new blog ${blogObject.title} by ${blogObject.author} added`])
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

	const handleIncreaseLike = async (blogObject, blogId) => {
		console.log('App.js -> handleIncreaseLike: Increase likes')
		console.log('blogObject:', blogObject)
		console.log('blogId:', blogId)
		try {
			const updatedBlog = await blogService.update(blogObject, blogId)
			console.log('updatedBlog', updatedBlog)
			setRerender(!reRender)

			setNotifications([`green`, `Updated blog ${blogObject.title} by ${blogObject.author}`])
			setTimeout(() => {
				setNotifications(null)
			}, 5000)
		} catch (error) {
			setNotifications([`red`, `Error updating blog`])
			setTimeout(() => {
				setNotifications(null)
			}, 5000)
		}
	}

	const handleRemoveBlog = async (blogId) => {
		console.log('App.js -> handleRemoveBlog() -> blogId: ', blogId)
		try {
			const removedBlog = await blogService.remove(blogId)
			console.log('removedBlog: ', removedBlog)
			setRerender(!reRender)

			setNotifications([`green`, `Removed blog ${removedBlog.title} by ${removedBlog.author}`])
			setTimeout(() => {
				setNotifications(null)
			}, 5000)
		} catch (error) {
			setNotifications([`red`, `Error removing blog`])
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
					<Togglable buttonLabel='Create new blog' ref={createBlogFormRef}>
						<CreateBlogForm
							handleCreateBlog={handleCreateBlog}
							createBlogFormRef={createBlogFormRef}
						/>
					</Togglable>
					<br />
					{userBlogs}
				</>
			}
		</div>
	)
}

export default App