describe('Home page tests', () => {
  beforeEach(() => {
    return cy.visit('/')
  })
  it('Home page should render correctly', () => {
    cy.contains('Начать').click()
  })
  it.only('Calc input \'from\' should work', () => {
    cy.get('.left__input input').type('1').should('have.value', '1')
  })
  it.only('Calc input \'to\' should work', () => {
    cy.get('.right__input input').type('1').should('have.value', '1')
  })
  describe('Routing should work', () => {
    it('Reserves', () => {
      cy.contains('Резервы').click()
      cy.url().should('include', '/reservi')
    })
  })
})
