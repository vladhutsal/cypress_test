// ------------ Visit Recruiters page, check recruiters info block and picture
describe('Recruiters Info block test', () => {
  before(() => {
    cy.login();
    cy.getFirstMsg().as('firstMsg');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
  })

  it('cheks if link redirects to valid recruiters page', () => {
    cy.get('@firstMsg').within(() => {
      cy.get('.media > .media-body > .recruiter-name > a')
        .click()
        .then(() => {
          const urlPattern = (/^https:\/\/djinni\.co\/r\/\d+[-\w+]+\/?$/);
          cy.url().then((chainer) => {
            expect(chainer).to.match(urlPattern);
          });
        });
    });
  })

  it('checks picture exists and not empty', () => {
    cy.get('.page-header-userpic').within(() => {
      cy.checkPictureNotEmpty();
    });
  })

  it('checks that recruiters name exists', () => {
    cy.get('h1').should('exist');
  })

  it('checks that recruiters position exists and leads to the company page', () => {
    const urlPattern = (/\/jobs\/company.+/);
    cy.get('.recruiter-headline-lg').should('not.be.empty')
      .find('a').should('has.attr', 'href')
      .and('match', urlPattern);
  })
})


// ------------ Check Open Jobs block
describe('Open Jobs block and internal links test', () => { 
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('sessionid');
      cy.get('.col-sm-8 > :nth-child(1)').as('openJobs');
    })

  it('checks if block is not empty and has the "Відкриті вакансії" name', () => {
    cy.get('@openJobs').should('not.be.empty')
      .children('h4').then((h4) => {
        expect(h4).to.have.text('Відкриті вакансії');
      })
  })

  it('checks if links exists and are valid', () => {
    const urlPattern = (/\/jobs\/\d+[-\w+]+\/?$/);
    cy.get('@openJobs').find('.list-common')
      .children()
      .each(li => {
        cy.wrap(li).find('a')
          .should('have.attr', 'href')
          .and('match', urlPattern);
      });
  })

  it('checks if all company jobs buttons are valid', () => {
    const urlPattern = (/\/jobs\/company.+/);
    cy.get('@openJobs').find('.light-button').then(btn => {
      const allCompanyJobsLink = btn[0]['href'];
      cy.validateUrlResponse(allCompanyJobsLink, 302, urlPattern)
    });
  })
})


// ------------ Check dialog button, company description and additional links
describe('Description block, start dialog button and additional buttons test', () => { 
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionid');
  })

  it('validate dialog button text', () => {
    cy.get('.col-sm-8 > .row > .col-sm-10 > .btn').then(a => {
      expect(a).to.include.text('Відкрити діалог')
    });
  })

  it('validate dialog button link', () => {
    const urlPattern = (/^https:\/\/djinni\.co\/my\/inbox\/\d+\/?/);
    cy.get('.col-sm-8 > .row > .col-sm-10 > .btn').then(a => {
      cy.validateUrlResponse(a[0]['href'], 200, urlPattern);
    });
  })

  it('check if description block exists and not empty', () => {
    cy.get('.col-sm-8 > :nth-child(3)')
      .find('h4').should('exist')
      .and('not.to.be.empty')
  })

})