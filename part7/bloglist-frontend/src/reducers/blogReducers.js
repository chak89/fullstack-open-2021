import blogsService from '../services/blogs'

//Fetch all blogs once at start
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

const blogReducer = (state = null, action) => {
	console.log('blogReducer() -> action:', action)
	switch (action.type) {
		case 'FETCH_ALL_BLOGS':
			return action.data
		case 'SET_BLOGS':
			return action.data
		default:
			return state
	}
}

export default blogReducer