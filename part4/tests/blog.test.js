const helper = require('./test_helper')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})


describe('total likes', () => {

	test('of empty list of zero', () => {
		const emptyBlogs = []

		const result = listHelper.totalLikes(emptyBlogs)
		expect(result).toBe(0)
	})


	test('when list has only one blog equals the likes of that', () => {
		const listWithOneBlog = [
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			}
		]

		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(helper.initialBlogs)
		expect(result).toBe(36)
	})

})


describe('favorite blog', () => {
	const answer =
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	}

	test('blog with most likes', () => {
		const result = listHelper.favoriteBlog(helper.initialBlogs)
		expect(result).toEqual(answer)
	})
})

describe('most blogs', () => {

	const answer =
	{
		author: "Robert C. Martin",
		blogs: 3
	}

	test('author who has the largest amount of blogs', () => {
		const result = listHelper.mostBlogs(helper.initialBlogs)
		expect(result).toEqual(answer)
	})

})

describe('most likes', () => {
	const answer =
	{
		author: "Edsger W. Dijkstra",
		likes: 17
	}

	test('author whose blog posts have the largest amount of likes', () => {
		const result = listHelper.mostLikes(helper.initialBlogs)
		expect(result).toEqual(answer)
	})
})