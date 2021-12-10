import './Notifications.css'

const Notifications = ({notifications}) => {
    if(notifications === null) {
        return null
    }

    return (
        <div className={notifications.includes('Information') ? "notificationsError" : "notifications" }>
            {notifications}
        </div>
    )
}

export default Notifications