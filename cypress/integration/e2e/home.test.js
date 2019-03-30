describe('Home page tests', () => {
  before(async () => {
    return await cy.task('initDB')
  })
  beforeEach(async () => {
    return cy.visit('/')
  })
  it('Home page should render correctly', () => {
    cy.contains('Начать').click()
  })
  describe('Create payment', () => {
    it('Sould create payment correctly', () => {
      const email = 'f**e@email.com'
      cy.get('.left__input input')
        .type('1.5')
        .get('[placeholder="ФИО"]')
        .type('Fake Fio')
        .get('main [placeholder="Почта"]')
        .type(email)
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
        .get('button')
        .contains('Начать')
        .click()
        .get('h3')
        .contains(email)
    })

    describe('Currency field behaviour', () => {
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

      it('Right field value should recalculate', () => {
        let predictedValue
        cy.get('[data-testid="exchange-container"] span:last-child').should(div => {
          predictedValue = div[0].innerText
        })
        cy.get('.left__input input')
          .type('1')
          .get('.right__input input')
          .should(input => {
            expect(predictedValue).to.equal(input[0].value)
          })
      })

      it('Left field value should recalculate', () => {
        cy.get('.right__input .dropdown')
          .trigger('mouseover')
          .get('.dropdown__content span span')
          .contains('Bitcoin')
          .click()
          .get('.right__input .dropdown')
          .trigger('mouseout')

        let predictedValue
        cy.get('[data-testid="exchange-container"] span:first-child').should(div => {
          predictedValue = div[0].innerText
        })
        cy.get('.right__input input')
          .type('1')
          .get('.left__input input')
          .should(input => {
            expect(predictedValue).to.equal(input[0].value)
          })
      })

      it('Left currency dropdown should work', () => {
        cy.get('.left__input .dropdown')
          .trigger('mouseover')
          .get('.dropdown__content span span')
          .contains('Ethereum')
          .click()
          .get('.left__input span')
          .contains('ETH')
      })

      it('Right currency dropdown should work', () => {
        cy.get('.right__input .dropdown')
          .trigger('mouseover')
          .get('.dropdown__content span span')
          .contains('Ethereum')
          .click()
          .get('.right__input span')
          .contains('ETH')
      })

      it('Currency should swap between each other correct', () => {
        cy.get('.right__input .dropdown')
          .trigger('mouseover')
          .get('.dropdown__content span span')
          .contains('Ethereum')
          .click()
          .get('.right__input span')
          .contains('ETH')
          .get('.left__input span')
          .contains('BTC')
          .get('.right__input .dropdown')
          .trigger('mouseout')
          .get('.left__input .dropdown')
          .trigger('mouseover')
          .get('.dropdown__content span span')
          .contains('Ethereum')
          .click()
          .get('.left__input span')
          .contains('ETH')
          .get('.right__input span')
          .contains('BTC')
      })
    })
  })
  describe('Routing should work', () => {
    it('Home', () => {
      cy.contains('Резервы')
        .click()
        .url()
        .should('include', '/reservi')
      cy.scrollTo(0, -100)
        .get('a')
        .contains('Главная')
        .click({force: true})
        .url()
        .should('include', '/')
    })

    it('Reserves', () => {
      cy.contains('Резервы')
        .click()
        .url()
        .should('include', '/reservi')
        .get('button')
        .contains('Начать')
        .click()
        .url()
        .should('include', '/')
    })

    it('About', () => {
      cy.contains('О нас')
        .click()
        .url()
        .should('include', '/o-nas')
        .get('button')
        .contains('Начать')
        .click()
        .url()
        .should('include', '/')
    })

    it('FAQ', () => {
      cy.contains('FAQ')
        .click()
        .url()
        .should('include', '/faq')
        .get('button')
        .contains('Начать')
        .click()
        .url()
        .should('include', '/')
    })

    it('Auth', () => {
      cy.get('nav > span.auth-menu-item')
        .click()
        .contains('Войти')
        .click()
        .url()
        .should('include', '/lichnii-kabinet')
        .get('button')
        .contains('Начать')
        .click()
        .url()
        .should('include', '/')
    })

    it('Registration', () => {
      cy.get('nav > span.auth-menu-item')
        .click()
        .contains('Регистрация')
        .click()
        .url()
        .should('include', '/registracya')
        .get('button')
        .contains('Начать')
        .click()
        .url()
        .should('include', '/')
    })
  })
})
