import React from 'react'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'

import {
	useNavigate
} from 'react-router-dom'

const Home = () => {
	const navigate = useNavigate()
	const user = useSelector(state => state.user)

	if(user !== null) {
		navigate('/users')
	}

	return (
		<div>
			<h2>Log in to application</h2>
			<Togglable buttonLabel='login'>
				<LoginForm />
			</Togglable>
		</div>
	)
}

export default Home