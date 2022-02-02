
export const showNotification = (content) => {
	return {
		type: 'SHOW_NOTIFICATION',
		data: content
	}
}

export const removeNotification = () => {
	return {
		type: 'REMOVE_NOTIFICATION',
		data: null
	}
}


const reducer = (state = null, action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch(action.type) {
		case 'SHOW_NOTIFICATION':
			return action.data
		case 'REMOVE_NOTIFICATION':
			return action.data
		default:
		return state
	}
}

export default reducer;