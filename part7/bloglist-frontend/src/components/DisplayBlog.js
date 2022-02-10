import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const DisplayBlog = ({ handleIncreaseLike, handleRemoveBlog }) => {
	const blogs = useSelector(state => state.blog)

	if( blogs === null) {
		return null
	}

	return (
		<div>
			{blogs
				.sort((a, b) => {
					return b.likes - a.likes
				})
				.map((blog) =>
					<Blog key={blog.id} blog={blog}
						handleIncreaseLike={handleIncreaseLike}
						handleRemoveBlog={handleRemoveBlog}
					/>)
			}
		</div>
	)
}

export default DisplayBlog
