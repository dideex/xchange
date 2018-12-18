import User from '../User'
import Api from '../../components/Api'
import Cookie from 'js-cookie'

jest.mock('../utils', () => ({
  setToken: () => {},
  logout: () => {},
  getToken: () => {},
  getAdminStatus: () => {},
}))

jest.mock('../../components/Api', () => ({
  post: () => {},
  get: () => {},
  errorEmitter: jest.fn(data => fn => data(fn)),
}))

const fakeLocale = 'fake-FK'
const fakeToken = 'fakeToken'
const fakeUser = {username: 'Batman', password: 'Nopassword'}
const fakeUserData = {
  wallets: [{bitcoin: 1234}],
  lastOperations: [],
  username: fakeUser.username,
  email: fakeUser.username,
  login: fakeUser.username,
  convertedAmount: 1000,
}
const Utils = require('../utils')

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
    Api.get = () => {}
    Api.post = () => {}
  })

  it('Check token', async () => {
    Api.get = jest.fn(() => Promise.resolve(data => data))
    Utils.getToken = jest.fn(() => fakeToken)
    await store._checkToken()
    expect(Utils.getToken).toHaveBeenCalledTimes(1)
    expect(Api.get).toHaveBeenCalledTimes(1)
    expect(Api.get).toHaveBeenCalledWith('token', '', fakeToken)
  })

  it('Getting token', async () => {
    Api.post = jest.fn(() => Promise.resolve({token: fakeToken}))

    const {username, password} = fakeUser
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

  it('fetch data without token', async () => {
    Utils.getToken = jest.fn(() => {})
    Api.get = jest.fn(() => Promise.resolve(fakeUserData))

    await store.fetchData()
    expect(Api.get).toHaveBeenCalledTimes(0)
    expect(store.token).toBe('')
  })

  it('fetch data', async () => {
    Utils.getToken = jest.fn(() => fakeToken)
    Api.get = jest.fn(() => Promise.resolve(fakeUserData))

    await store.fetchData()
    expect(Api.get).toHaveBeenCalledTimes(1)
    expect(Api.get).toHaveBeenCalledWith('userData', '', fakeToken)
    expect(store.username).toBe(fakeUserData.username)
    expect(store.login).toBe(fakeUserData.login)
    expect(store.email).toBe(fakeUserData.email)
    expect(store.wallets[0]).toMatchObject(fakeUserData.wallets[0])
    expect(store.lastOperations.length).toBe(fakeUserData.lastOperations.length)
    expect(store.convertedAmount).toBe(fakeUserData.convertedAmount)
  })

  it('Get locale from the cookie', () => {
    Cookie.get = jest.fn(() => fakeLocale)

    const newStore = new User()
    expect(newStore.locale).toBe(fakeLocale)
  })

  it('Get default locale from the cookie', () => {
    Cookie.get = jest.fn(() => '')

    const newStore = new User()
    expect(newStore.locale).toBe('ru-RU')
  })

  it('update info', async () => {
    Utils.getToken = jest.fn(() => fakeToken)
    Api.post = jest.fn(() => Promise.resolve())
    store.username = fakeUserData.username
    store.wallets = fakeUserData.wallets
    store.email = fakeUserData.email

    const {username, wallets, email} = store

    await store.updateInfo()
    expect(Api.post).toHaveBeenCalledTimes(1)
    expect(Api.post).toHaveBeenCalledWith(
      'userData',
      {username, wallets, email},
      fakeToken,
    )
  })
  
  it('update info without token', async () => {
    Utils.getToken = jest.fn(() => {})
    Api.post = jest.fn(() => Promise.resolve())

    expect(Api.post).toHaveBeenCalledTimes(0)
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
