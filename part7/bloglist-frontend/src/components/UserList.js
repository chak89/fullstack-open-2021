import React from 'react'
import { useSelector } from 'react-redux'
import {
	Link
} from 'react-router-dom'

const UserList = () => {
	const userList = useSelector(state => state.userList)
	console.log('UserList.js')

	if (userList === null) {
		return null
	}

	const userTable = {
		tableLayout: 'auto',
		width: '50%'
	}

	return (
		<div>
			<h2>Users</h2>
			<div>
				<table style={userTable}>
					<thead>
						<tr>
							<th>User</th>
							<th>blogs created</th>
						</tr>
					</thead>
					<tbody>
						{
							userList.map(user =>
								<tr key={user.id}>
									<td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
									<td>{user.blogs.length}</td>
								</tr>
							)
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default UserList

