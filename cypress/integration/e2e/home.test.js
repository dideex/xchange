describe('Home page tests', () => {
  beforeEach(() => {
    return cy.visit('/')
  })
  it('Home page should render correctly', () => {
    cy.getByLabelText(/создать/i).click()
  })
})
