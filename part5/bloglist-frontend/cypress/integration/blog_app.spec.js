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
})