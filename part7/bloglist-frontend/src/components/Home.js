import React, { useEffect } from 'react'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'

import {
	useNavigate
} from 'react-router-dom'

const Home = () => {
	const navigate = useNavigate()
	const user = useSelector(state => state.user)

	useEffect(() => {
		if(user !== null) {
			navigate('/users')
		}
	}, [user])


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