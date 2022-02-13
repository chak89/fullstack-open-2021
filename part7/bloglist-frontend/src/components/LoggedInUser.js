import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Routes,
	Route,
	useNavigate,
	useLocation
} from 'react-router-dom'

import { userLogout } from '../reducers/userReducer'

import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import UserList from './UserList'
import DisplayUserBlogList from './DisplayUserBlogList'
import Blog from './Blog'

const LoggedInUser = () => {
	const createBlogFormRef = useRef()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.user)
	const location = useLocation()

	//check if current path is users or blogs
	const rootPath = location.pathname.substring(
		location.pathname.indexOf('/') + 1,
		location.pathname.lastIndexOf('/')
	)

	const logoutHandler = () => {
		dispatch(userLogout())
		navigate('/')
	}

	if (!user) {
		return null
	}

	return (
		<div>
			<h2>Blogs</h2>
			<p>{user.name} logged in</p>
			<button onClick={logoutHandler}>Logout</button>
			<Togglable buttonLabel='Create new blog' ref={createBlogFormRef}>
				<CreateBlogForm createBlogFormRef={createBlogFormRef} />
			</Togglable>
			<br />
			<UserList />
			<Routes>
				<Route path='/:id' element={rootPath === 'users' ? <DisplayUserBlogList /> : <Blog />} />
			</Routes>
		</div>
	)
}

export default LoggedInUser