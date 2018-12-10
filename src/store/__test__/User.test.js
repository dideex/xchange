import User from '../User'

jest.mock('../../components/Api', () => {
  return {
    post: function() {
      return new Promise(r => r({a: 1}))
    },
    get: function() {
      return new Promise(r => r({a: 1}))
    },
    errorEmitter: jest.fn()
  }
})
// const Api = require('../../components/Api')
// Api.mockImplementation(() => new Promise(r => r(['test', 'data'])))
// Api.post = () => 123

describe('Menu store tests', () => {
  let store
  beforeEach(() => {
    store = new User()
  })

  it('jest', () => {
    expect(1 + 1).toBe(2)
  })

  it('init menu', () => {
    expect(store.orders.length).toBe(0)
    expect(store.login).toBe('')
  })

  it('Getting token', () => {
    store.getToken()
    expect(store.loading).toBe(true)
  })

  // it('toggle menu', () => {
  //   menuStore.toggleMenu()
  //   expect(menuStore.state).toBe('main')
  //   menuStore.toggleMenu()
  //   expect(menuStore.state).toBe('close')
  // })

  // it('is open state', () => {
  //   menuStore.toggleMenu()
  //   expect(menuStore.isOpen).toBe(true)
  //   menuStore.toggleMenu()
  //   expect(menuStore.isOpen).toBe(false)
  // })

  // it('State behavior', () => {
  //   menuStore.openConstructor()
  //   expect(menuStore.state).toBe('constructor')
  //   menuStore.closeMenu()
  //   expect(menuStore.state).toBe('close')
  //   menuStore.openMain()
  //   expect(menuStore.state).toBe('main')
  //   menuStore.openTY()
  //   expect(menuStore.state).toBe('thank-you')
  //   menuStore.openCallback()
  //   expect(menuStore.state).toBe('callback')
  //   menuStore.openCallback()
  //   expect(menuStore.state).toBe('main')
  //   menuStore.openCallback()
  //   expect(menuStore.state).toBe('callback')
  //   menuStore.openOrder()
  //   expect(menuStore.state).toBe('order')
  // })
})
