import React from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {
	const notification = useSelector(state => state.notification)

	console.log('Notification -> notification:', notification)

	if (notification === null) {
		return null
	}

	return (
		<>
			<div className={notification.status === 'success' ? 'notificationSuccess' : 'notificationError'}>
				{notification.data}
			</div>
			<br />
		</>
	)
}

export default Notification