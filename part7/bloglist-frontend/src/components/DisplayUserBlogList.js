import React from 'react'
import { useSelector } from 'react-redux'
import {
	Link,
	useParams
} from 'react-router-dom'

const DisplayUserBlogList = () => {
	const userList = useSelector(state => state.userList)
	const blogs = useSelector(state => state.blog)
	const { id } = useParams()

	if (!userList) {
		return null
	}

	//IIFE
	const selectedUser = (() => {
		return userList.find(user => user.id === id)
	})()

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div>
			<h2>{selectedUser.name}</h2>
			<h3>Added blogs:</h3>
			{console.log('RERERERERERENDER: ',blogs)}
			{blogs
				.filter((blog) => (blog.user?.username === selectedUser.username) || (blog?.user === selectedUser.id))
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

export default DisplayUserBlogList