import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from '../components/CreateBlogForm'


//Check that the form calls the event handler it received as props with the right details when a new blog is created.
test('Right details when a new blog is created', () => {
	const mockCallBack = jest.fn()

	const component = render(
		<CreateBlogForm handleCreateBlog={mockCallBack}/>
	)

	const inputTitle = component.container.querySelector('#formTitle');
	const inputAuthor = component.container.querySelector('#formAuthor');
	const inputUrl = component.container.querySelector('#formUrl');
	const form = component.container.querySelector("form");

	fireEvent.change(inputTitle, {
		target: { value: "Interstellar" },
	});
	fireEvent.change(inputAuthor, {
		target: { value: "Christoper Nolan" },
	});
	fireEvent.change(inputUrl, {
		target: { value: "http://interstellar.com" },
	});

	fireEvent.submit(form);

	expect(mockCallBack.mock.calls).toHaveLength(1)
	expect(mockCallBack.mock.calls[0][0].title).toBe("Interstellar");
	expect(mockCallBack.mock.calls[0][0].author).toBe("Christoper Nolan");
	expect(mockCallBack.mock.calls[0][0].url).toBe("http://interstellar.com");
})