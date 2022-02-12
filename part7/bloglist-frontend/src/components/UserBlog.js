import React from 'react'
import { useSelector } from 'react-redux'
import {
	useParams
} from 'react-router-dom'

const UserBlog = () => {
	const userList = useSelector(state => state.userList)
	const blogs = useSelector(state => state.blog)
	const { id } = useParams()

	console.log('IN USERBLOG.js -> id', id)

	//IIFE
	const selectedUser = (() => {
		return userList.find(user => user.id === id)
	})()

	return (
		<div>
			<h2>{selectedUser.name}</h2>
			<h3>Added blogs:</h3>
			<ul>
				{blogs
					.filter((blog) => blog.user.username === selectedUser.username)
					.sort((a, b) => {
						return b.likes - a.likes
					})
					.map((blog) =>
						<li key={blog.id}>{blog.title}</li>)
				}
			</ul>
		</div>
	)
}

export default UserBlog