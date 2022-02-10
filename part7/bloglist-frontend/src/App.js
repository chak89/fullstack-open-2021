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

	const createBlogFormRef = useRef()

	const dispatch = useDispatch()

	//Fetch all blogs once at start
	useEffect(() => {
		dispatch(fetchAllBlogs())
	}, [])

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
							createBlogFormRef={createBlogFormRef}
						/>
					</Togglable>
					<br />
					<DisplayBlog />
				</>
			}
		</div>
	)
}

export default App