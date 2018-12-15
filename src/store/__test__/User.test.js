import User from '../User'
import Api from '../../components/Api'

const fakeToken = 'fakeToken'
jest.mock('../utils', () => ({
  setToken: () => {},
  logout: () => {},
  getToken: () => {},
  getAdminStatus: () => {},
}))

// jest.mock('../../components/Api')
jest.mock('../../components/Api', () => ({
  post: jest.fn(() => Promise.resolve({token: 'fakeToken'})),
  get: jest.fn(() => Promise.resolve(data => data)),
  errorEmitter: jest.fn(data => fn => data(fn)),
}))

const fakeUser = {username: 'Batman', password: 'Nopassword'}
const Utils = require('../utils')
// const Api = require('../../components/Api')

describe('Menu store tests', () => {
  let store
  beforeEach(() => {
    store = new User()
    store._setInitalData()
  })

  it('jest', () => {
    expect(1 + 1).toBe(2)
  })

  it('init menu', () => {
    expect(store.orders.length).toBe(0)
    expect(store.username).toBe('')
  })

  it('Check token', async () => {
    Utils.getToken = jest.fn(() => fakeToken)
    await store._checkToken()
    expect(Utils.getToken).toHaveBeenCalledTimes(1)
    expect(Api.get).toHaveBeenCalledTimes(1)
    expect(Api.get).toHaveBeenCalledWith('token', '', fakeToken)
  })

  it('Getting token', async () => {
    const {username, password} = fakeUser
    // Api.mockImplementation(({get: fn}));
    store.changeLogin(username)
    store.changePassword(password)
    store.fetchData = jest.fn()
    expect(store.loading).toBe(false)
    expect(store.isNetworkError).toBe(false)
    await store.getToken()
    expect(Api.post).toHaveBeenCalledTimes(1)
    expect(Api.post).toBeCalledWith('signinUser', fakeUser)
    expect(Api.errorEmitter).toHaveBeenCalledTimes(1)
    expect(store.token).toBe('fakeToken')
    expect(store.loading).toBe(false)
    expect(store.fetchData).toHaveBeenCalledTimes(1)
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
