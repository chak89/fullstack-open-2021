import React, { useState } from 'react'

//"Paranthesis" to return an object.
const CreateBlogForm = ({ handleCreateBlog }) => (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={handleCreateBlog}>
				<div>
					title:
					<input type="text" name="title" />
				</div>
				<div>
					author:
					<input type="text" name="author" />
				</div>
				<div>
					url:
					<input type="text" name="linkurl" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)

export default CreateBlogForm