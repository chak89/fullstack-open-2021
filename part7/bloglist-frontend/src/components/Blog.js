import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import {
	useNavigate,
	useParams
} from 'react-router-dom'

//"Paranthesis" to return an object.
const Blog = () => {

	const { id } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const blogs = useSelector(state => state.blog)

	if(!blogs) {
		return null
	}

	const blog = blogs.find(elem => elem.id === id)

	const handleAddLike = (e) => {
		e.preventDefault()
		dispatch(likeBlog(blog))
	}

	const handleRemoveBlog = (e) => {
		e.preventDefault()

		if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog.id))
			navigate(-1)
		}
	}

	return (
		<div>
			<h2><strong>{blog.title} - {blog.author}</strong></h2>
			<div>
				<p id='url'>Url: {blog.url} </p>
				<p id='likes'>Likes: {blog.likes} <button id='likeButton' type='submit' onClick={handleAddLike}>Like</button></p>
				<p id='username'>Added by: {blog.user.username}</p>
				<button id='removeBlog' type='submit' onClick={handleRemoveBlog}>remove blog</button>
			</div>
		</div>
	)
}

export default Blog
