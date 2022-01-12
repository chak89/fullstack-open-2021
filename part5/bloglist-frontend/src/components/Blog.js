import React, { useState } from 'react'

//"Paranthesis" to return an object.
const Blog = ({ blog }) => {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [buttonLabel, setButtonLabel] = useState("view")
	const showWhenVisible = { display: buttonLabel === 'hide' ? '' : 'none' }

	const handleButton = () => {
		if (buttonLabel === 'view') {
			setButtonLabel('hide')
		}
		else if (buttonLabel === 'hide') {
			setButtonLabel('view')
		}
	}


	return (
		<div style={blogStyle}>
			<div>
				<strong>{blog.title} - {blog.author}
				</strong><button type="submit" onClick={handleButton}>{buttonLabel}</button>
				<div style={showWhenVisible}>
					<p>Url: {blog.url} </p>
					<p>Likes: {blog.likes} <button type='submit'>Like</button></p> 
					<p>username: {blog.user.username}</p>
				</div>
			</div>
		</div>
	)
}

export default Blog

/*{ <tr>
<td>{blog.title}</td>
<td>{blog.author}</td>
<td>{blog.url}</td>
<td>{blog.likes}</td>
</tr> 

<button type="submit" onClick={handleDisplayInfo}>view</button>
}
*/
