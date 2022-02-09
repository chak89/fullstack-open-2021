import React from 'react'
import './Notification.css'

const Notifications = ({ notifications }) => {
	if (notifications === null) {
		return null
	}

	return (
		<>
			<div className={notifications[0] === 'red'? 'notificationsError' : 'notifications'}>
				{notifications[1]}
			</div>
			<br />
		</>
	)
}

export default Notifications