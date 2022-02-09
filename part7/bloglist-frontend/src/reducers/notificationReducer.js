export const showNotification = (content, status, timeInSeconds) => {
	return async dispatch => {
		dispatch({
			type: 'SHOW_NOTIFICATION',
			data: content,
			status: status
		})
		setTimeout(() => dispatch(removeNotification()), timeInSeconds * 1000)
	}
}

export const removeNotification = () => {
	return {
		type: 'REMOVE_NOTIFICATION',
	}
}

const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'SHOW_NOTIFICATION':
			return action
		case 'REMOVE_NOTIFICATION':
			return null
		default:
			return state
	}
}

export default notificationReducer