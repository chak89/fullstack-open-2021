import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { fetchAllBlogs } from './reducers/blogReducers'

import './App.css'
import DisplayBlog from './components/DisplayBlog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [reRender, setRerender] = useState(false)

	const createBlogFormRef = useRef()

	const dispatch = useDispatch()

	//Fetch all blogs once at start, and when rerender
	useEffect(() => {
		dispatch(fetchAllBlogs())
	}, [reRender])

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
			dispatch(showNotification('wrong username or password', 'error', 3))
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
			dispatch(showNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success', 3))
		} catch (error) {
			dispatch(showNotification(`Error creating new blog`, 'error', 3))
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
			dispatch(showNotification(`Updated blog ${blogObject.title} by ${blogObject.author}`, 'success', 3))
		} catch (error) {
			dispatch(showNotification(`Error updating blog`, 'error', 3))
		}
	}

	const handleRemoveBlog = async (blogId) => {
		console.log('App.js -> handleRemoveBlog() -> blogId: ', blogId)
		try {
			const removedBlog = await blogService.remove(blogId)
			console.log('removedBlog: ', removedBlog)
			setRerender(!reRender)
			dispatch(showNotification(`Removed blog ${removedBlog.title} by ${removedBlog.author}`, 'success', 3))
		} catch (error) {
			dispatch(showNotification(`Error removing blog`, 'error', 3))
		}
	}


	return (
		<div>
			{user === null ?
				<>
					<h2>Log in to application</h2>
					<Notification />
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
					<Notification />
					<p>{user.name} logged in<button type="submit" onClick={handleLogout}>Logout</button></p>
					<Togglable buttonLabel='Create new blog' ref={createBlogFormRef}>
						<CreateBlogForm
							handleCreateBlog={handleCreateBlog}
							createBlogFormRef={createBlogFormRef}
						/>
					</Togglable>
					<br />
					<DisplayBlog handleIncreaseLike={handleIncreaseLike} handleRemoveBlog={handleRemoveBlog} />
				</>
			}
		</div>
	)
}

export default App