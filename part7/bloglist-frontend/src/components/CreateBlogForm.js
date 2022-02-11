import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { createBlog } from '../reducers/blogReducer'

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
					title:
					<input name='title' {...title} />
				</div>
				<div>
					author:
					<input name='author' {...author} />
				</div>
				<div>
					url:
					<input name='linkurl' {...linkurl} />
				</div>
				<button id='createBlog' type='submit'>create</button>
			</form>
		</div>
	)
}

export default CreateBlogForm