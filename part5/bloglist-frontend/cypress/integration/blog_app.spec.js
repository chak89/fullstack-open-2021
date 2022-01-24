describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.request('POST', 'http://localhost:3003/api/users', {
			username: 'testUser', password: 'testPassword', name: 'testName'
		}).then(response => {
			localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
			cy.visit('http://localhost:3000')
		})
	})

	it('Login form is shown', function () {
		cy.visit('http://localhost:3000')
		cy.contains('login').click()
		cy.get('#username').should('be.visible')
		cy.get('#password').should('be.visible')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.visit('http://localhost:3000')
			cy.contains('login').click()
			cy.get('#username').type('testUser')
			cy.get('#password').type('testPassword')
			cy.get('#login-button').click()
			cy.contains('testName logged in')
		})

		it('fails with wrong credentials', function () {
			cy.visit('http://localhost:3000')
			cy.contains('login').click()
			cy.get('#username').type('WrongUserName')
			cy.get('#password').type('WrongPassword')
			cy.get('#login-button').click()
			cy.contains('wrong username or password')
		})
	})

	describe('When logged in', function () {
		it('A blog can be created', function () {
			cy.visit('http://localhost:3000')
			cy.contains('login').click()
			cy.get('#username').type('testUser')
			cy.get('#password').type('testPassword')
			cy.get('#login-button').click()
			cy.contains('Create new blog').click()
			cy.get('#formTitle').type('TestBlog1')
			cy.get('#formAuthor').type('TestBlogAuhor1')
			cy.get('#formUrl').type('www.testblog1.com')
			cy.get('#createBlog').click()
			cy.contains('a new blog TestBlog1 by TestBlogAuhor1 added')
		})

		it('User can like blog', function () {
			cy.visit('http://localhost:3000')
			cy.contains('login').click()
			cy.get('#username').type('testUser')
			cy.get('#password').type('testPassword')
			cy.get('#login-button').click()
			cy.contains('Create new blog').click()
			cy.get('#formTitle').type('TestBlog1')
			cy.get('#formAuthor').type('TestBlogAuhor1')
			cy.get('#formUrl').type('www.testblog1.com')
			cy.get('#createBlog').click()
			cy.contains('a new blog TestBlog1 by TestBlogAuhor1 added')

			cy.contains('view').click()
			cy.get('#likes').should('be.visible').and('contain', 'Likes: 0')
			cy.get('#likeButton').click()
			cy.get('#likes').should('be.visible').and('contain', 'Likes: 1')
		})

		it('User can delete own blogs', function () {
			cy.visit('http://localhost:3000')
			cy.contains('login').click()
			cy.get('#username').type('testUser')
			cy.get('#password').type('testPassword')
			cy.get('#login-button').click()
			cy.contains('Create new blog').click()
			cy.get('#formTitle').type('TestBlog1')
			cy.get('#formAuthor').type('TestBlogAuhor1')
			cy.get('#formUrl').type('www.testblog1.com')
			cy.get('#createBlog').click()
			cy.contains('a new blog TestBlog1 by TestBlogAuhor1 added')

			cy.contains('view').click()
			cy.get('#removeBlog').should('be.visible').click()
			cy.contains('Removed blog TestBlog1 by TestBlogAuhor1')
		})

		it('blogs are ordered by likes', function () {
			cy.visit('http://localhost:3000')
			cy.contains('login').click()
			cy.get('#username').type('testUser')
			cy.get('#password').type('testPassword')
			cy.get('#login-button').click()

			cy.contains('Create new blog').click()
			cy.get('#formTitle').type('TestBlog1')
			cy.get('#formAuthor').type('TestBlogAuhor1')
			cy.get('#formUrl').type('www.testblog1.com')
			cy.get('#createBlog').click()
			cy.contains('a new blog TestBlog1 by TestBlogAuhor1 added')
			cy.contains('view').click()
			cy.get('#likeButton').click()
			cy.contains('hide').click()


			cy.contains('Create new blog').click()
			cy.get('#formTitle').type('TestBlog2')
			cy.get('#formAuthor').type('TestBlogAuhor2')
			cy.get('#formUrl').type('www.testblog2.com')
			cy.get('#createBlog').click()
			cy.contains('a new blog TestBlog2 by TestBlogAuhor2 added')
			cy.wait(500)

			cy.get('.userBlogs').eq(1).within((el) => {
				cy.get(el[0]).contains('Like').click({ force: true })
				cy.wait(1000)
				cy.get(el[0]).contains('Like').click({ force: true })
			})


			cy.contains('Create new blog').click()
			cy.get('#formTitle').type('TestBlog3')
			cy.get('#formAuthor').type('TestBlogAuhor3')
			cy.get('#formUrl').type('www.testblog3.com')
			cy.get('#createBlog').click()
			cy.contains('a new blog TestBlog3 by TestBlogAuhor3 added')
			cy.wait(500)
			cy.get('.userBlogs').eq(2).within((el) => {
				cy.get(el[0]).contains('Like').click({ force: true })
				cy.wait(1000)
				cy.get(el[0]).contains('Like').click({ force: true })
				cy.wait(1000)
				cy.get(el[0]).contains('Like').click({ force: true })
			})

			cy.get(".userBlogs").should((items) => {
				expect(items[0]).to.contain('TestBlog3');
				expect(items[1]).to.contain('TestBlog2');
				expect(items[2]).to.contain('TestBlog1');
			});
		})
	})
})