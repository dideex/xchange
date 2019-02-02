import User from '../User'
import Api from '../../components/Api'
import Cookie from 'js-cookie'
import Utils from '../utils'
import {fakeLocale, fakeToken, fakeUser, fakeUserData} from '../__mocks__/data'

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

const fakeOrders = [1, 2, 3, 4, 5]

describe('Menu store tests', () => {
  let store
  beforeEach(() => {
    store = new User()
    store._setInitalData()
  })

  it('jest', () => {
    expect(1 + 1).toBe(2)
  })

  it('init store', () => {
    expect(store.orders.length).toBe(0)
    expect(store.username).toBe('')
  })

  it('Init store with admin status', async () => {
    Utils.getAdminStatus = () => true
    let adminStore = new User()
    expect(adminStore.isAdmin).toBeTruthy()
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
    expect(store.lastOperations).toEqual(
      expect.arrayContaining(fakeUserData.lastOperations),
    )
    expect(store.convertedAmount).toBe(fakeUserData.convertedAmount)
  })

  it('fetch data without token', async () => {
    Utils.getToken = jest.fn(() => {})
    Api.get = jest.fn(() => Promise.resolve(fakeUserData))

    await store.fetchData()
    expect(Api.get).toHaveBeenCalledTimes(0)
    expect(store.token).toBe('')
  })

  it('Sign up new user', async () => {
    Utils.setToken = jest.fn()
    Api.post = jest.fn(() => Promise.resolve({token: fakeToken}))
    store.username = fakeUserData.username
    store.email = fakeUserData.email
    store.login = fakeUserData.login
    store.password = fakeUserData.password
    store.fetchData = jest.fn()

    await store.signupUser()
    const {username, email, login, password} = store
    expect(Api.post).toHaveBeenCalledTimes(1)
    expect(Api.post).toHaveBeenCalledWith('signupUser', {
      username,
      email,
      login,
      password,
    })
    expect(store.fetchData).toHaveBeenCalledTimes(1)
    expect(Utils.setToken).toHaveBeenCalledTimes(1)
    expect(store.token).toBe(fakeToken)
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

  it('fetching orders', async () => {
    store.token = fakeToken
    Api.get = jest.fn(() => Promise.resolve(fakeOrders))

    await store.fetchOrdersByToken()
    expect(store.loading).toBe(false)
    expect(Api.get).toHaveBeenCalledTimes(1)
    expect(Api.get).toHaveBeenCalledWith('orders', '', fakeToken)
    expect(store.orders).toEqual(expect.arrayContaining(fakeOrders))
  })

  it('fetching orders without token', async () => {
    Api.get = jest.fn(() => Promise.resolve(fakeToken))
    const fakeId = 'fakeId'

    const res = await store.fetchGuestOrder(fakeId)
    expect(store.loading).toBe(false)
    expect(Api.get).toHaveBeenCalledTimes(1)
    expect(Api.get).toHaveBeenCalledWith('order', `?_id=${fakeId}`)
    expect(res).toBe(fakeToken)
  })
  describe('Test actions', () => {
    beforeEach(() => {
      store.clearErr = jest.fn()
    })

    it('Change locale', () => {
      Cookie.set = jest.fn()
      const testLocale = 'test locale'
      store.changeLocale(testLocale)
      expect(store.locale).toBe(testLocale)
      expect(Cookie.set).toHaveBeenCalledTimes(1)
      expect(Cookie.set).toHaveBeenCalledWith('locale', testLocale)
    })

    it('Change username', () => {
      store.changeUsername(fakeUser.username)
      expect(store.username).toBe(fakeUser.username)
      expect(store.clearErr).toHaveBeenCalledTimes(1)
    })

    it('Change email', () => {
      store.changeEmail(fakeUser.username)
      expect(store.email).toBe(fakeUser.username)
      expect(store.clearErr).toHaveBeenCalledTimes(1)
    })

    it('Change phone', () => {
      store.changePhone(fakeUser.username)
      expect(store.phone).toBe(fakeUser.username)
      expect(store.clearErr).toHaveBeenCalledTimes(1)
    })

    it('Change wallet', () => {
      store.changeWallet('BTC')('1234')
      expect(store.wallets.BTC).toBe('1234')
      store.changeWallet('RUR')('4321')
      expect(store.wallets.RUR).toBe('4321')
      expect(store.wallets.BTC).toBe('1234')
    })
  })
})
