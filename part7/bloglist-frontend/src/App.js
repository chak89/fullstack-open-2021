import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/userListReducer'

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom'

import Notification from './components/Notification'
import LoggedInUser from './components/LoggedInUser'
import Home from './components/Home'
import './App.css'
import Container from '@material-ui/core/Container'



const App = () => {
	//const [user, setUser] = useState(null)
	const blog = useSelector(state => state.blog)
	const dispatch = useDispatch()

	//Fetch all blogs once at start
	useEffect(() => {
		dispatch(fetchAllBlogs())
	}, [])

	//Get all users once at start and when new blog is created
	useEffect(() => {
		dispatch(getAllUsers())
	}, [blog])

	//Check if user detailed of a logged-in user can already found on the local storage after refresh
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
		if (loggedUserJSON) {
			const loggedInUser = JSON.parse(loggedUserJSON)
			dispatch(setUser(loggedInUser))
		}
	}, [])

	return (
		<Container>
			<Router>
				<div>
					<Notification />
					<Routes>
						<Route path='/blogs/*' element={<LoggedInUser />} />
						<Route path='/users/*' element={<LoggedInUser />} />
						<Route path='/' element={<Home />} />
					</Routes>
				</div>
			</Router >
		</Container>
	)
}

export default App