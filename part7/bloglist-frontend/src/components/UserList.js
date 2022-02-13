import React from 'react'
import { useSelector } from 'react-redux'
import {
	Link
} from 'react-router-dom'

import {
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@material-ui/core'

const UserList = () => {
	const userList = useSelector(state => state.userList)
	console.log('UserList.js')

	if (userList === null) {
		return null
	}

	return (
		<div>
			<h2>Users</h2>
			<div>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>User</TableCell>
								<TableCell>Blogs created</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								userList.map(user =>
									<TableRow key={user.id}>
										<TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
										<TableCell>{user.blogs.length}</TableCell>
									</TableRow>
								)
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div >
	)
}

export default UserList

