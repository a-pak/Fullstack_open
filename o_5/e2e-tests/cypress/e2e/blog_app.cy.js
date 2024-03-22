describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Tester',
      username: 'test',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) 
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log In').click()
  })

  it('user with wrong credentials can not log in', function() {
    cy.contains('Log In').click()

    cy.get('#username').type('test')
    cy.get('#password').type('vääräsalainen')
    cy.get('#login-button').click()

    cy.contains('Wrong Credentials')
  })

  it('user with right credentials can log in', function() {
    cy.contains('Log In').click()

    cy.get('#username').type('test')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('blogs')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'salainen' })
      cy.visit('')
    })

    it('user can add a blog', function() {
      cy.createBlog({
        author: 'testAuthor',
        title: 'testTitle',
        url: 'www.url.com'
      })
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'GET',
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      }).then((response) => {
        expect(response.body[0]).to.deep.include({
          author: 'testAuthor',
          title: 'testTitle',
          url: 'www.url.com'
        })
      })
    })

    it('user can like a blog', function() {
      cy.createBlog({
        author: 'testAuthor',
        title: 'testTitle',
        url: 'www.url.com'
      })
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'GET',
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      }).then((response) => {
        expect(response.body[0]).to.deep.include({
          author: 'testAuthor',
          title: 'testTitle',
          url: 'www.url.com'
        })
        console.log('resBOD',response.body[0].id)
        const blogId = response.body[0].id

        cy.request({
          url: `${Cypress.env('BACKEND')}/blogs/${blogId}`,
          method: 'PUT',
          body: {
            id: blogId,
            author: 'testAuthor',
            title: 'testTitle',
            url: 'www.url.com',
            likes: 1
          },
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
          }
        })
      })

      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'GET',
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      }).then((response) => {
        expect(response.body[0]).to.deep.include({
          likes: 1
        })
      })
    })
    it('user can delete a blog', function() {
      cy.createBlog({
        author: 'testAuthor',
        title: 'testTitle',
        url: 'www.url.com'
      })
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'GET',
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      }).then((response) => {
        expect(response.body[0]).to.deep.include({
          author: 'testAuthor',
          title: 'testTitle',
          url: 'www.url.com'
        })
        const blogId = response.body[0].id

        cy.request({
          url: `${Cypress.env('BACKEND')}/blogs/${blogId}`,
          method: 'DELETE',
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
          }
        })
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'GET',
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
          }
        }).then((response) => {
          expect(response.body).to.have.lengthOf(0)
        })
        cy.visit('')
        })
    })
  })
})