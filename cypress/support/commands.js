Cypress.Commands.add('login', () => {
  cy.visit(Cypress.env('LoginPage'))
  cy.get('#email').type('vl.hutsal@gmail.com')
  cy.get('#password').type('easytobreakinparol{enter}')
  cy.url().should('eq', Cypress.env('InboxPage'))
})


Cypress.Commands.add('getFirstMsg', () => {
  cy.get('h3').next().children('.inbox-message').first();
})


Cypress.Commands.add('validateUrlResponse', (url, expectedStatus, expectedUrl) => {
  cy.request({
    url: url,
    followRedirect: false
  })
    .then((response) => {
      expect(response.status).to.eq(expectedStatus)
      expect(response.allRequestResponses[0]['Request URL']).to.eq(expectedUrl)
    });
})


Cypress.Commands.add('checkPictureNotEmpty', () => {
  cy.get('user-picture[picture=""]').should('not.exist');
  cy.get('user-picture[name=""]').should('not.exist');
})