const key =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVjYTFmMGE5OWNmY2UwNDQyZDg4N2Y3MiJ9.Mu-xdiYC30faym1zD2qUcX72Bd5-ram_xcG9vzpTSG4'
const fakeUser = {
  username: 'fakeUser',
  password: '123456'
}


describe('Auth page tests', () => {
  before(async () => {
    return await cy.task('initDB')
  })
  beforeEach(async () => {
    return cy.visit('/lichnii-kabinet')
  })

  describe('Auth route', () => {
    it('Auth should work', () => {
      cy.get('input[placeholder="Логин"]')
        .type(fakeUser.username)
        .get('input[placeholder="Пароль"')
        .type(fakeUser.password)
        .get('button')
        .contains('Войти')
        .click()
        .url()
        .should('include', '/lichnii-kabinet')
        .get('.noty_layout div')
        .contains('Вы успешно вошли в аккаунт')
        .getCookie('key')
        .should(({value}) => {
          expect(value).to.equal(key)
          return null
        })
    })
  })
  describe('Authorized user behaviour', () => {
    beforeEach(() => {
      return cy.setCookie('key', key).visit('/')
    })

    it('Authorzied user should see his login in menu', () => {
      cy.get('nav > span.auth-menu-item')
        .click()
        .contains(fakeUser.username)
    })
    
    it.only('Authorized user should enter in his account', () => {
      cy.get('nav > span.auth-menu-item')
        .click()
        .contains(fakeUser.username)
        .click()
        .get('h2')
        .contains('Личный кабинет')
        .url()
        .should('include', '/lichnii-kabinet')
    })
  })
})
