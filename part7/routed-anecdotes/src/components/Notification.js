import React from 'react'

const Notification = (props) => {
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}
	return (
		props.notification == null ? props.notification :
		<div style={style}>
			{props.notification}
		</div>
	)
}

export default Notification