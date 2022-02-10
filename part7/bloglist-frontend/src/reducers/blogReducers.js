import blogsService from '../services/blogs'
import { showNotification } from './notificationReducer'

//Fetch all blogs
export const fetchAllBlogs = () => {
	return async dispatch => {
		const blogs = await blogsService.getAll()
		console.log('initializeBlogs() -> blogs:', blogs)
		dispatch({
			type: 'FETCH_ALL_BLOGS',
			data: blogs
		})
	}
}

//Create a new blog
export const createBlog = (newBlogObject) => {
	return async dispatch => {
		const onSuccess = (createdBlog) => {
			dispatch({
				type: 'NEW_BLOG',
				data: createdBlog
			})
			dispatch(showNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, 'success', 3))
			return createBlog
		}

		const onError = (error) => {
			dispatch({ type: 'ERROR_GENERATED', error })
			dispatch(showNotification(`Error creating new blog`, 'error', 3))
			return error
		}

		try {
			console.log('createdBlog() -> newBlogObject', newBlogObject)
			const createdBlog = await blogsService.create(newBlogObject)
			console.log('createdBlog() -> createdBlog', createdBlog)
			return onSuccess(createdBlog)
		} catch (error) {
			return onError(error)
		}
	}
}

//Like a blog
export const likeBlog = (blog) => {
	return async dispatch => {

		const updatedBlog = {
			...blog,
			'user': blog.user.id,
			'likes': blog.likes + 1
		}

		try {
			console.log('blogReducer.js -> likeBlog() -> updatedBlog:', updatedBlog)
			const returnedBlog = await blogsService.update(updatedBlog, blog.id)
			console.log('blogReducer.js -> likeBlog() -> returnedBlog:', returnedBlog)
			dispatch({
				type: 'LIKE_BLOG',
				data: returnedBlog
			})
			dispatch(showNotification(`Updated blog ${returnedBlog.title} by ${returnedBlog.author}`, 'success', 3))
		} catch (error) {
			console.log('error:', error)
			dispatch(showNotification(`Error updating blog`, 'error', 3))
		}
	}
}

//Delete a blog
export const deleteBlog = (blogId) => {
	return async dispatch => {
		try {
			const removedBlog = await blogsService.remove(blogId)
			console.log('blogReducer.js -> deleteBlog() -> removedBlog:', removedBlog)
			dispatch({
				type: 'DELETE_BLOG',
				data: removedBlog
			})
			dispatch(showNotification(`Removed blog ${removedBlog.title} by ${removedBlog.author}`, 'success', 3))
		} catch (error) {
			console.log('error:', error)
			dispatch(showNotification(`Error removing blog`, 'error', 3))
		}
	}
}

//Reducer
const blogReducer = (state = null, action) => {
	console.log('blogReducer() -> action:', action)
	switch (action.type) {
		case 'FETCH_ALL_BLOGS':
			return action.data
		case 'NEW_BLOG':
			return [...state, action.data]
		case 'LIKE_BLOG': {
			const id = action.data.id
			const blogToVote = state.find(b => b.id === id)
			const changedBlog = {
				...blogToVote,
				likes: blogToVote.likes + 1
			}
			return state.map(elem =>
				elem.id !== id ? elem : changedBlog)
		}
		case 'DELETE_BLOG':
			return state.filter(elem => elem.id !== action.data.id)
		default:
			return state
	}
}

export default blogReducer