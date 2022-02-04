
export const showNotification = (content, timeInSeconds) => {
	return async dispatch => {
		dispatch({
			type: 'SHOW_NOTIFICATION',
			data: content
		})
		setTimeout(() => dispatch(removeNotification()), timeInSeconds*1000);
	}
}

export const removeNotification = () => {
	return {
		type: 'REMOVE_NOTIFICATION',
		data: null
	}
}

const notificationReducer = (state = null, action) => {
/* 	console.log('state now: ', state)
	console.log('action', action) */

	switch(action.type) {
		case 'SHOW_NOTIFICATION':
			return action.data
		case 'REMOVE_NOTIFICATION':
			return action.data
		default:
		return state
	}
}

export default notificationReducer;