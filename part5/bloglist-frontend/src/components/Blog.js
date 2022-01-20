import React, { useState } from 'react'

//"Paranthesis" to return an object.
const Blog = ({ blog, handleIncreaseLike, handleRemoveBlog }) => {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [buttonLabel, setButtonLabel] = useState('view')
	const showWhenVisible = { display: buttonLabel === 'hide' ? '' : 'none' }

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

		const updateBlog =
		{
			'user': blog.user.id,
			'title': blog.title,
			'author': blog.author,
			'url': blog.url,
			'likes': blog.likes + 1
		}

		handleIncreaseLike(updateBlog, blog.id)
	}

	const handleRemove = (e) => {
		e.preventDefault()

		if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
			handleRemoveBlog(blog.id)
		}
	}

	return (
		<div style={blogStyle}>
			<div>
				<strong>{blog.title} - {blog.author}
				</strong><button type="submit" onClick={handleButton}>{buttonLabel}</button>
				<div style={showWhenVisible} className='togglableContent'>
					<p id='url'>Url: {blog.url} </p>
					<p id='likes'>Likes: {blog.likes} <button type='submit' onClick={handleAddLike}>Like</button></p>
					<p id='username'>username: {blog.user.username}</p>
					<button type='submit' onClick={handleRemove}>remove blog</button>
				</div>
			</div>
		</div>
	)
}

export default Blog
