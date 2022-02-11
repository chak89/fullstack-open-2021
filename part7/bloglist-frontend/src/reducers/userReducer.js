import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

export const userLogin = (credentials) => {
	return async dispatch => {
		try {
			console.log('userReducer.js -> userLogin() -> credentials:', credentials)
			const respondedUser = await loginService.login(credentials)
			console.log('userReducer.js -> userLogin() -> respondedUser:', respondedUser)
			dispatch({
				type: 'USER_LOGIN',
				data: respondedUser
			})

			//Set user token
			console.log('userReducer.js -> userLogin() -> respondedUser.token:', respondedUser.token)
			blogService.setToken(respondedUser.token)
			window.localStorage.setItem(
				'loggedInBlogUser', JSON.stringify(respondedUser)
			)
		} catch (error) {
			dispatch(showNotification('wrong username or password', 'error', 3))
		}
	}
}

export const setUser = (user) => {
	return async dispatch => {
		dispatch({
			type: 'SET_USER',
			data: user
		})
	}
}

export const userLogout = () => {
	return async dispatch => {
		dispatch({
			type: 'USER_LOGOUT',
			data: null
		})
		window.localStorage.clear()
		blogService.setToken(null)
	}
}


const userReducer = (state = null, action) => {
	console.log('userReducer -> action:', action)
	switch (action.type) {
		case 'USER_LOGIN':
			return action.data
		case 'USER_LOGOUT':
			return action.data
		case 'SET_USER':
			return action.data
		default:
			return state
	}
}

export default userReducer