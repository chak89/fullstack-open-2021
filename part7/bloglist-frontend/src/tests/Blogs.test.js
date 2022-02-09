import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'


describe('Test Blog component', () => {
	let component
	let blog

	beforeEach(() => {
		blog = {
			title: "Darkside of the Moon",
			author: "Pink Floyd",
			url: "http://pinkfloyd.com",
			likes: 1234,
			user: {
				username: "Pinky"
			}
		}
	})


	//Checks that the component displaying a blog renders the blog's title and author, 
	//but does not render its url or number of likes by default.
	test('renders content', () => {
		const component = render(
			<Blog blog={blog} />
		)

		expect(component.container).toHaveTextContent("Darkside of the Moon")
		expect(component.container).toHaveTextContent("Pink Floyd")
		expect(component.container).toHaveTextContent("http://pinkfloyd.com")

		const urlContent = component.container.querySelector('#url')
		const likesContent = component.container.querySelector('#likes')
		const usernameContent = component.container.querySelector('#username')

		expect(urlContent).not.toBeVisible()
		expect(likesContent).not.toBeVisible()
		expect(usernameContent).not.toBeVisible()
	})


	//Checks that the blog's url and number of likes are shown, 
	//when the button controlling the shown details has been clicked.
	test('clicking the view button once to show extra information', () => {

		const component = render(
			<Blog blog={blog} />
		)

		const div = component.container.querySelector('.togglableContent')
		const urlContent = component.container.querySelector('#url')
		const likesContent = component.container.querySelector('#likes')
		const usernameContent = component.container.querySelector('#username')

		expect(div).toHaveStyle('display: none')
		expect(urlContent).not.toBeVisible()
		expect(likesContent).not.toBeVisible()
		expect(usernameContent).not.toBeVisible()

		const button = component.getByText('view')
		fireEvent.click(button)

		expect(div).toHaveStyle('display: block')
		expect(urlContent).toBeVisible()
		expect(likesContent).toBeVisible()
		expect(usernameContent).toBeVisible()
	})


	//Ensures that if the like button is clicked twice, 
	//the event handler the component received as props is called twice.
	test('Like button clicked twice, event handler also called twice', () => {

		const mockCallBack = jest.fn()

		const component = render(
			<Blog blog={blog} handleIncreaseLike={mockCallBack} />
		)

		const button = component.getByText('view')
		fireEvent.click(button)

		const likeButton = component.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

		expect(mockCallBack).toHaveBeenCalledTimes(2)
	})

})

