import User from '../User'

jest.mock('../../components/Api', () => {
  return {
    // post: jest.fn(() => Promise.resolve({data: {token: 'data'}})),
    post: jest.fn(() => ({
      then() {
        return () => {return {token: 'newToken'}}
      },
    })),
    get: jest.fn(() => Promise.resolve(data => data)),
    errorEmitter: jest.fn(data => data()),
  }
})
const Api = require('../../components/Api')
const fakeUser = {username: 'Batman', password: 'Nopassword'}

describe('Menu store tests', () => {
  let store
  beforeEach(() => {
    store = new User()
    const {username, password} = fakeUser
    store.changeLogin(username)
    store.changePassword(password)
  })

  it('jest', () => {
    expect(1 + 1).toBe(2)
  })

  it('init menu', () => {
    expect(store.orders.length).toBe(0)
    expect(store.username).toBe('')
  })

  it('Getting token', () => {
    store.getToken()
    expect(store.loading).toBe(true)
    expect(store.isNetworkError).toBe(false)
    expect(Api.post).toHaveBeenCalledTimes(1)
    expect(Api.post).toBeCalledWith('signinUser', fakeUser)
    expect(Api.errorEmitter).toHaveBeenCalledTimes(1)
    expect(Api.errorEmitter).toBeCalledWith({})
    expect(Api.get).toHaveBeenCalledTimes(0)
    console.log(' LOG ___ store.loading ', store.loading)
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
