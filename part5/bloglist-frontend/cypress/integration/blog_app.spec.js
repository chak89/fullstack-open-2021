describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.request('POST', 'http://localhost:3003/api/users', {
			username: 'testUser', password: 'testPassword', name: 'testName'
		}).then(response => {
			localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
			cy.visit('http://localhost:3000')
		})
  })

  it('Login form is shown', function() {
		cy.visit('http://localhost:3000')
		cy.contains('login').click()
		cy.get('#username').should('be.visible')
		cy.get('#password').should('be.visible')
  })

	describe('Login',function() {
    it('succeeds with correct credentials', function() {
			cy.visit('http://localhost:3000')
			cy.contains('login').click()
			cy.get('#username').type('testUser')
			cy.get('#password').type('testPassword')
			cy.get('#login-button').click()
			cy.contains('testName logged in')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
			cy.contains('login').click()
			cy.get('#username').type('WrongUserName')
			cy.get('#password').type('WrongPassword')
			cy.get('#login-button').click()
			cy.contains('wrong username or password')
    })
  })

	describe('When logged in', function() {
    it('A blog can be created', function() {
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

		it('User can like blog', function() {
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
  })

})