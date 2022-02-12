import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Routes,
	Route,
	useNavigate,
} from 'react-router-dom'

import { userLogout } from '../reducers/userReducer'

import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import UserList from './UserList'
import DisplayBlog from './DisplayBlog'
import UserBlog from './UserBlog'

const LoggedInUser = () => {
	const createBlogFormRef = useRef()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.user)

	const logoutHandler = () => {
		dispatch(userLogout())
		navigate('/')
	}

	return (
		<div>
			<h2>Blogs</h2>
			<p>{user.name} logged in<button onClick={logoutHandler}>Logout</button></p>
			<Togglable buttonLabel='Create new blog' ref={createBlogFormRef}>
				<CreateBlogForm createBlogFormRef={createBlogFormRef} />
			</Togglable>
			<br />
			<DisplayBlog />
			<UserList />
			<Routes>
				<Route path='/:id' element={<UserBlog />} />
			</Routes>
		</div>
	)
}

export default LoggedInUser