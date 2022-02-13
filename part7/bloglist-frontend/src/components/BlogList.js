import React from 'react'
import { useSelector } from 'react-redux'

import {
	Link
} from 'react-router-dom'

import {
	Paper,
	Stack,
	styled
} from '@mui/material'

const BlogList = () => {
	const blogs = useSelector(state => state.blog)

	if (!blogs) {
		return null
	}

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'left',
		color: theme.palette.text.secondary,
	}))

	return (
		<div>
			<h2>All blogs</h2>
			<Stack spacing={2}>
				{blogs
					.sort((a, b) => {
						return b.likes - a.likes
					})
					.map((blog) =>
						<Item key={blog.id}>
							<Link to={`/blogs/${blog.id}`}><strong>{blog.title} {blog.author}</strong></Link>
						</Item>
					)
				}
			</Stack>
		</div>
	)
}

export default BlogList