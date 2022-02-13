import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import {
	Routes,
	Route,
	useLocation
} from 'react-router-dom'



import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import UserList from './UserList'
import DisplayUserBlogList from './DisplayUserBlogList'
import Blog from './Blog'
import NavigationMenu from './NavigationMenu'
import BlogList from './BlogList'

const LoggedInUser = () => {
	const createBlogFormRef = useRef()
	const user = useSelector(state => state.user)
	const location = useLocation()

	//check if current path is users or blogs
	const paths = location.pathname.split('/')

	if (!user) {
		return null
	}

	console.log('PATHS', paths)

	return (
		<div>
			<NavigationMenu />
			<h2>Blog app</h2>
			<Togglable buttonLabel='Create new blog' ref={createBlogFormRef}>
				<CreateBlogForm createBlogFormRef={createBlogFormRef} />
			</Togglable>
			<br />
			<Routes>
				<Route path='/:id' element={paths[1] === 'users' ? <DisplayUserBlogList /> : <Blog />} />
				<Route path='/' element={paths[1] === 'users' ? <UserList /> : <BlogList />} />
			</Routes>
		</div>
	)
}

export default LoggedInUser