import userService from '../services/users'

export const getAllUsers = () => {
	return async dispatch => {
		const userList = await userService.getAllUsers()
		console.log('userListReducer.js -> getAllUsers() -> userList:', userList)
		dispatch({
			type: 'GET_ALL_USERS',
			data: userList
		})
	}
}

const userListReducer = (state = null, action) => {
	console.log('userListReducer -> action:', action)
	switch (action.type) {
		case 'GET_ALL_USERS':
			return action.data
		default:
			return state
	}
}

export default userListReducer