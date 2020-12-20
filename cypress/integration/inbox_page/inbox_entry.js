describe('Test first inbox entry', () => {
  before(() => {
    cy.login();
  })

  beforeEach(() => {
    cy.getFirstMsg().as('firstMsg');
  })

  it('checks if picture exists and not empty', () => {
    cy.get('@firstMsg').within(() => {
      cy.get('.media > .media-left').within(() => {
        cy.checkPictureNotEmpty();
      });
    });
  })

  it('checks if info block exists and not empty', () => {
    cy.get('@firstMsg').within(() => {
      cy.get('.media-body').find('span').each(el => {
        expect(el).not.to.be.empty;
      });
    });
  })

  it('checks if message block exists and not empty', () => {
    cy.get('@firstMsg').within(() => {
      cy.get('.col-sm-6 > .message-text > a').then(el => {
        expect(el).not.to.be.empty;
      });
    });
  })
})


describe('Test first inbox entry dropdown menu', () => {
  beforeEach(() => {
    cy.getFirstMsg()
      .as('firstMsg').within(() => {
        cy.get('.col-sm-2 > .message-btn-wrapper > .btn-group')
          .as('btn-group');
    });
  })

  it('checks if dropdown is visible', () => {
    cy.get('@firstMsg').within(() => {
      cy.get('@btn-group').find('.btn').click();
      cy.get('@btn-group').find('ul').should('be.visible');
    });
  })

  it('checks if dropdown has 3 buttons and divider', () => {
    cy.get('@firstMsg').within(() => {
      cy.get('@btn-group').children('ul').find('li').each((li, idx, liArr) => {
        expect(liArr).to.have.length(4);
      });
    });
  })

  it('checks if dropdown buttons has links', () => {
    const urlPatern = new RegExp('\/my\/.+')
    cy.get('@firstMsg').within(() => {
      cy.get('@btn-group').children('ul').within(() => {
        cy.get('.divider').siblings().each(el => {
          cy.wrap(el).find('a')
            .should('has.attr', 'href')
            .and('match', urlPatern)
        });
      });
    });
  })
})