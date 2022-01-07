import React from 'react'

//"Paranthesis" to return an object.
const Blog = ({ blog }) => (
	<div>
		{blog.title} {blog.author}
	</div>
)

export default Blog