const {saveFixtures} = require('../../helpers/init-fixtures')

describe('Home page tests', () => {
  before(async () => {
    return await cy.task('initDB')
  })
  beforeEach(async () => {
    return cy.visit('/')
  })
  it.only('Home page should render correctly', () => {
    cy.contains('Начать').click()
  })

  it("Calc input 'from' should work", () => {
    cy.get('.left__input input')
      .type('1')
      .should('have.value', '1')
  })

  it("Calc input 'to' should work", () => {
    cy.get('.right__input input')
      .type('1')
      .should('have.value', '1')
  })
  describe('Create payment', () => {
    it.only('Sould create payment correctly', () => {
      cy.get('.left__input input')
        .type('1.5')
        .get('[placeholder="ФИО"]')
        .type('Fake Fio')
        .get('main [placeholder="Почта"]')
        .type('fake@email.com')
        .get('[placeholder="Ваш bitcoin кошелек"]')
        .type('1J8rcVPwRjJdi1jhk95AsjMfsLBbP7x7pS')
        .get('[placeholder="Ваш номер для сбербанк руб"]')
        .type('1234 4321 5678 8765')
        .get('label[for="agree"]')
        .click()
        .get('button')
        .contains('Создать')
        .click()
        .url()
        .should('include', '/podtverjdenie-oplati')
        .get('button')
        .contains('Я перевел')
        .click()
        .url()
        .should('include', '/spasibo')
        .get('button')
        .contains('Следить за переводом')
        .click()
        .url()
        .should('include', '/perevod/')
    })
  })
  describe('Routing should work', () => {
    it('Reserves', () => {
      cy.contains('Резервы').click()
      cy.url().should('include', '/reservi')
    })
  })
})
