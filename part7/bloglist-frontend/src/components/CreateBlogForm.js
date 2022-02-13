import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { createBlog } from '../reducers/blogReducer'

import {
	Button,
	TextField
} from '@mui/material'

//"Paranthesis" to return an object.
const CreateBlogForm = ({ createBlogFormRef }) => {
	const { reset: resetTitle, ...title } = useField('formTitle', 'text')
	const { reset: resetAuthor, ...author } = useField('formAuthor', 'text')
	const { reset: resetLinkurl, ...linkurl } = useField('formUrl', 'text')

	const dispatch = useDispatch()

	const addBlog = async (event) => {
		event.preventDefault()

		const newBlog =
		{
			'title': title.value,
			'author': author.value,
			'url': linkurl.value || ' '
		}

		resetTitle()
		resetAuthor()
		resetLinkurl()

		//RefHook, close blog form after submit
		if (createBlogFormRef?.current) {
			createBlogFormRef.current.toggleVisibility()
		}

		dispatch(createBlog(newBlog))
	}

	return (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={addBlog}>
				<div>
					<TextField id="filled-basic" label="Title" variant="filled" name='title' {...title} />
				</div>
				<div>
					<TextField id="filled-basic" label="Author" variant="filled" name='author' {...author} />
				</div>
				<div>
					<TextField id="filled-basic" label="Url" variant="filled" name='linkurl' {...linkurl} />
				</div>
				<Button variant="contained" id='createBlog' type="submit">Create</Button>
			</form>
		</div>
	)
}

export default CreateBlogForm