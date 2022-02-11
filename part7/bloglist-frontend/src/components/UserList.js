import React from 'react'
import { useSelector } from 'react-redux'

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
				<table>
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
									<td>{user.name}</td>
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

