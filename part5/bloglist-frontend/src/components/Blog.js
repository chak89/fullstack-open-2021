import React, { useState } from 'react'

//"Paranthesis" to return an object.
const Blog = ({ blog, handleIncreaseLike }) => {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [buttonLabel, setButtonLabel] = useState("view")
	const showWhenVisible = { display: buttonLabel === 'hide' ? '' : 'none' }

	const handleButton = () => {
		if (buttonLabel === 'view') {
			setButtonLabel('hide')
		}
		else if (buttonLabel === 'hide') {
			setButtonLabel('view')
		}
	}

	const addLike = (e) => {
		e.preventDefault()

		console.log(blog.title)
		console.log(blog.author)
		console.log(blog.url)
		console.log(blog.likes)
		console.log(blog.id)
		console.log(blog.user.username)
		console.log(blog.user.id)

		
		const updateBlog =
		{
			"user": blog.user.id,
			"title": blog.title,
			"author": blog.author,
			"url": blog.url,
			"likes": blog.likes + 1
		}

		handleIncreaseLike(updateBlog, blog.id)
	}

	return (
		<div style={blogStyle}>
			<div>
				<strong>{blog.title} - {blog.author}
				</strong><button type="submit" onClick={handleButton}>{buttonLabel}</button>
				<div style={showWhenVisible}>
					<p>Url: {blog.url} </p>
					<p>Likes: {blog.likes} <button type='submit' onClick={addLike}>Like</button></p> 
					<p>username: {blog.user.username}</p>
				</div>
			</div>
		</div>
	)
}

export default Blog
