import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

//"Paranthesis" to return an object.
const Blog = ({ blog }) => {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [buttonLabel, setButtonLabel] = useState('view')
	const showWhenVisible = { display: buttonLabel === 'hide' ? '' : 'none' }
	const dispatch = useDispatch()

	const handleButton = () => {
		if (buttonLabel === 'view') {
			setButtonLabel('hide')
		}
		else if (buttonLabel === 'hide') {
			setButtonLabel('view')
		}
	}

	const handleAddLike = (e) => {
		e.preventDefault()
		dispatch(likeBlog(blog))
	}

	const handleRemoveBlog = (e) => {
		e.preventDefault()

		if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog.id))
		}
	}

	return (
		<div style={blogStyle}>
			<div className='userBlogs'>
				<strong>{blog.title} - {blog.author}
				</strong><button type="submit" onClick={handleButton}>{buttonLabel}</button>
				<div style={showWhenVisible} className='togglableContent'>
					<p id='url'>Url: {blog.url} </p>
					<p id='likes'>Likes: {blog.likes} <button id='likeButton' type='submit' onClick={handleAddLike}>Like</button></p>
					<p id='username'>username: {blog.user.username}</p>
					<button id='removeBlog' type='submit' onClick={handleRemoveBlog}>remove blog</button>
				</div>
			</div>
		</div>
	)
}

export default Blog
