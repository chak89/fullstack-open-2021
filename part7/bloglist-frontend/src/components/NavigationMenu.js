import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Link,
	useNavigate
} from 'react-router-dom'

import { userLogout } from '../reducers/userReducer'

import './NavigationMenu.css'

const NavigationMenu = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.user)

	const logoutHandler = () => {
		dispatch(userLogout())
		navigate('/')
	}

	return (
		<div className='topnav'>
			<div className='item'><Link to="/blogs">Blogs</Link></div>
			<div className='item'><Link to="/users">Users</Link></div>
			<div className='item'>{user.name} logged in</div>
			<div className='item'><button onClick={logoutHandler}>Logout</button></div>
		</div>
	)
}

export default NavigationMenu