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
  describe('Locale should change correctly', () => {
    it('English locale', () => {
      cy.get('nav > span')
        .contains('Язык')
        .click()
        .get('.content--enter-done > span')
        .contains('Eng')
        .click()
        .get('h1 span')
        .should('contain', 'Currency exchange')
    })
    it('France locale', () => {
      cy.get('nav > span')
        .contains('Язык')
        .click()
        .get('.content--enter-done > span')
        .contains('Fr')
        .click()
        .get('h1 span')
        .should('contain', 'Échange de devises')
    })
    it('Chinese locale', () => {
      cy.get('nav > span')
        .contains('Язык')
        .click()
        .get('.content--enter-done > span')
        .contains('Cn')
        .click()
        .get('h1 span')
        .should('contain', '货币兑换')
    })
    it('Russian locale', () => {
      cy.get('nav > span')
        .contains('Язык')
        .click()
        .get('.content--enter-done > span')
        .contains('Cn')
        .click()
        .get('.content--enter-done > span')
        .contains('Рус')
        .click()
        .get('h1 span')
        .should('contain', 'Обмен валют')
    })
  })
  describe.only('Icon should be able to drag', () => {
    const dataTransfer = new DndSimulatorDataTransfer()

    it('Dragging btc into left field', () => {
      cy.get('[data-testid="dnd-area"] span')
        .contains('Bitcoin')
        .parent()
        .parent()
        .trigger('mousedown', {which: 1})
        .trigger('dragstart', {dataTransfer})
        .trigger('drag')

      cy.get('.left__input')
        .trigger('dragover', {dataTransfer})
        .trigger('drop', {dataTransfer})
        .trigger('dragend', {dataTransfer})
        .trigger('mouseup', {which: 1})
        .contains('BTC')
        .get('.left__input svg title')
        .contains('Bitcoin')
    })

    it('Dragging eth into left field', () => {
      cy.get('[data-testid="dnd-area"] span')
        .contains('Ethereum')
        .parent()
        .parent()
        .trigger('mousedown', {which: 1})
        .trigger('dragstart', {dataTransfer})
        .trigger('drag')

      cy.get('.left__input')
        .trigger('dragover', {dataTransfer})
        .trigger('drop', {dataTransfer})
        .trigger('dragend', {dataTransfer})
        .trigger('mouseup', {which: 1})
        .contains('ETH')
        .get('.left__input svg title')
        .contains('Ethereum')
    })

    it('Dragging xrp into left field', () => {
      cy.get('[data-testid="dnd-area"] span')
        .contains('XRP')
        .parent()
        .parent()
        .trigger('mousedown', {which: 1})
        .trigger('dragstart', {dataTransfer})
        .trigger('drag')

      cy.get('.left__input')
        .trigger('dragover', {dataTransfer})
        .trigger('drop', {dataTransfer})
        .trigger('dragend', {dataTransfer})
        .trigger('mouseup', {which: 1})
        .contains('XRP')
        .get('.left__input svg title')
        .contains('XRP')
    })

    it('Dragging btc into right field', () => {
      cy.get('[data-testid="dnd-area"] span')
        .contains('Bitcoin')
        .parent()
        .parent()
        .trigger('mousedown', {which: 1})
        .trigger('dragstart', {dataTransfer})
        .trigger('drag')

      cy.get('.right__input')
        .trigger('dragover', {dataTransfer})
        .trigger('drop', {dataTransfer})
        .trigger('dragend', {dataTransfer})
        .trigger('mouseup', {which: 1})
        .contains('BTC')
        .get('.right__input svg title')
        .contains('Bitcoin')
    })

    it('Dragging eth into right field', () => {
      cy.get('[data-testid="dnd-area"] span')
        .contains('Ethereum')
        .parent()
        .parent()
        .trigger('mousedown', {which: 1})
        .trigger('dragstart', {dataTransfer})
        .trigger('drag')

      cy.get('.right__input')
        .trigger('dragover', {dataTransfer})
        .trigger('drop', {dataTransfer})
        .trigger('dragend', {dataTransfer})
        .trigger('mouseup', {which: 1})
        .contains('ETH')
        .get('.right__input svg title')
        .contains('Ethereum')
    })

    it('Dragging xrp into right field', () => {
      cy.get('[data-testid="dnd-area"] span')
        .contains('XRP')
        .parent()
        .parent()
        .trigger('mousedown', {which: 1})
        .trigger('dragstart', {dataTransfer})
        .trigger('drag')

      cy.get('.right__input')
        .trigger('dragover', {dataTransfer})
        .trigger('drop', {dataTransfer})
        .trigger('dragend', {dataTransfer})
        .trigger('mouseup', {which: 1})
        .contains('XRP')
        .get('.right__input svg title')
        .contains('XRP')
    })
  })
})

function DndSimulatorDataTransfer() {
  this.data = {}
}

DndSimulatorDataTransfer.prototype.dropEffect = 'move'
DndSimulatorDataTransfer.prototype.effectAllowed = 'all'
DndSimulatorDataTransfer.prototype.files = []
DndSimulatorDataTransfer.prototype.items = []
DndSimulatorDataTransfer.prototype.types = []

DndSimulatorDataTransfer.prototype.clearData = function(format) {
  if (format) {
    delete this.data[format]

    const index = this.types.indexOf(format)
    delete this.types[index]
    delete this.data[index]
  } else {
    this.data = {}
  }
}

DndSimulatorDataTransfer.prototype.setData = function(format, data) {
  this.data[format] = data
  this.items.push(data)
  this.types.push(format)
}

DndSimulatorDataTransfer.prototype.getData = function(format) {
  if (format in this.data) {
    return this.data[format]
  }

  return ''
}

DndSimulatorDataTransfer.prototype.setDragImage = function(img, xOffset, yOffset) {
  // since simulation doesn"t replicate the visual
  // effects, there is no point in implementing this
}
