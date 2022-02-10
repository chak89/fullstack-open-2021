import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const DisplayBlog = () => {
	const blogs = useSelector(state => state.blog)

	if (blogs === null) {
		return null
	}

	return (
		<div>
			{blogs
				.sort((a, b) => {
					return b.likes - a.likes
				})
				.map((blog) =>
					<Blog key={blog.id} blog={blog} />)
			}
		</div>
	)
}

export default DisplayBlog
