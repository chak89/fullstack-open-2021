import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'


//Checks that the component displaying a blog renders the blog's title and author, 
//but does not render its url or number of likes by default.
test('renders content', () => {
	const blog = {
		title: "Darkside of the Moon",
		author: "Pink Floyd",
		url: "http://pinkfloyd.com",
		likes: 1234,
		user: {
			username: "Pinky"
		}
	}

	const component = render(
		<Blog blog={blog} />
	)

	expect(component.container).toHaveTextContent("Darkside of the Moon")
	expect(component.container).toHaveTextContent("Pink Floyd")
	expect(component.container.url).toBeUndefined()
	expect(component.container.likes).toBeUndefined()
	expect(component.container.user).toBeUndefined()

})