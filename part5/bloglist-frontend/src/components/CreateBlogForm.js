import React, { useState } from 'react'

//"Paranthesis" to return an object.
const CreateBlogForm = ({ handleCreateBlog, createBlogFormRef }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [linkurl, setLinkurl] = useState('')

	const addBlog = (e) => {
		e.preventDefault()

		const newBlog =
		{
			'title': title,
			'author': author,
			'url': linkurl || ' '
		}

		//RefHook, close blog form after submit
		if(createBlogFormRef?.current) {
			createBlogFormRef.current.toggleVisibility()
		}

		setTitle('')
		setAuthor('')
		setLinkurl('')

		handleCreateBlog(newBlog)
	}

	return (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={addBlog}>
				<div>
					title:
					<input
						id='formTitle'
						type='text'
						name='title'
						value={title}
						onChange={(event => setTitle(event.target.value))}
					/>
				</div>
				<div>
					author:
					<input
						id='formAuthor'
						type='text'
						name='author'
						value={author}
						onChange={(event => setAuthor(event.target.value))}
					/>
				</div>
				<div>
					url:
					<input
						id='formUrl'
						type='text'
						name='linkurl'
						value={linkurl}
						onChange={(event => setLinkurl(event.target.value))}
					/>
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default CreateBlogForm