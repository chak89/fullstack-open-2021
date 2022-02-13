import React from 'react'
import { useSelector } from 'react-redux'
import {
	Link
} from 'react-router-dom'

const BlogList = () => {
	const blogs = useSelector(state => state.blog)

	if (!blogs) {
		return null
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div>
			<h2>All blogs</h2>
			{blogs
				.sort((a, b) => {
					return b.likes - a.likes
				})
				.map((blog) =>
					<div style={blogStyle} key={blog.id}>
						<Link to={`/blogs/${blog.id}`}><strong>{blog.title} {blog.author}</strong></Link>
					</div>
				)
			}
		</div>
	)
}

export default BlogList