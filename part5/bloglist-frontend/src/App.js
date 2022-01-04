import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])


	return (
		<div>
			{user === null ? 
			<LoginForm user={user} />
			:
			blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)
		}
		</div>
	)
}

export default App