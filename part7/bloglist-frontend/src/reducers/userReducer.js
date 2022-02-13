import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

export const userLogin = (credentials) => {
	return async dispatch => {
		const onSuccess = (respondedUser) => {
			console.log('userLogin -> onSuccess()')
			//Set user token
			blogService.setToken(respondedUser.token)
			window.localStorage.setItem(
				'loggedInBlogUser', JSON.stringify(respondedUser)
			)
			return dispatch({
				type: 'USER_LOGIN',
				data: respondedUser
			})
		}

		const onError = (error) => {
			console.log('userLogin -> onError() -> error:', error)
			dispatch(showNotification('wrong username or password', 'error', 3))
			return dispatch({
				type: 'USER_LOGIN_ERROR',
				error
			})
		}

		try {
			const respondedUser = await loginService.login(credentials)
			return onSuccess(respondedUser)
		} catch (error) {
			return onError(error)
		}
	}
}

export const setUser = (user) => {
	return async dispatch => {
		blogService.setToken(user.token)
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
		case 'USER_LOGIN_ERROR':
			return null
		default:
			return state
	}
}

export default userReducer