import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Link,
	useNavigate
} from 'react-router-dom'

import {
	Button,
	AppBar,
	Toolbar,
	Typography
} from '@mui/material'

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
		<AppBar position="static">
			<Toolbar>
				<Button color="inherit">
					<Link to="/blogs">Blogs</Link>
				</Button>
				<Button color="inherit">
					<Link to="/users">Users</Link>
				</Button>
				<Typography component="div" sx={{ flexGrow: 1 }}/>
				<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
					{user.name} logged in
				</Typography>
				<Button variant='contained' onClick={logoutHandler}>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	)

	/* 	return (
			<div className='topnav'>
				<div className='item'><Link to="/blogs">Blogs</Link></div>
				<div className='item'><Link to="/users">Users</Link></div>
				<div className='item'>{user.name} logged in</div>
				<div className='item'><Button variant="outlined" onClick={logoutHandler}>Logout</Button></div>
			</div>
		) */
}

export default NavigationMenu

