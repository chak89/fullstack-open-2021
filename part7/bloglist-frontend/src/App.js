import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBlogs } from './reducers/blogReducer'
import { setUser, userLogout,  } from './reducers/userReducer'

import './App.css'
import DisplayBlog from './components/DisplayBlog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	//const [user, setUser] = useState(null)
	const user = useSelector(state => state.user)

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
			dispatch(setUser(loggedInUser))
		}
	}, [])


	return (
		<div>
			{user === null ?
				<>
					<h2>Log in to application</h2>
					<Notification />
					<Togglable buttonLabel='login'>
						<LoginForm />
					</Togglable>
				</>
				:
				<>
					<h2>Blogs</h2>
					<Notification />
					<p>{user.name} logged in<button onClick={() => dispatch(userLogout())}>Logout</button></p>
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