
var timeouts = []

export const showNotification = (content, timeInSeconds) => {
	return async dispatch => {
		clearTimeout()
		dispatch({
			type: 'SHOW_NOTIFICATION',
			data: content
		})

		//Store timeouts in an array so we can cancel the previous established timeout.
		//So only the latest notification is counted.
		clearTimeout(timeouts[timeouts.length - 1])
		timeouts.push(setTimeout(() => dispatch(removeNotification()), timeInSeconds*1000))
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