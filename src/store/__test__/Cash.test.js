import Cash from '../Cash'
import Api from '../../components/Api'
import openSocket from 'socket.io-client'

// jest.mock('socket.io-client', jest.fn)

jest.mock('../../components/Api', () => ({
  post: () => {},
  get: () => {},
  errorEmitter: jest.fn(data => fn => data(fn)),
}))

const fakeLocale = 'fake-FK'
const fakeToken = 'fakeToken'
const fakeUser = {username: 'Batman', password: 'Nopassword'}
const fakeUserData = {
  password: fakeUser.password,
  wallets: [{bitcoin: 1234}],
  lastOperations: [],
  username: fakeUser.username,
  email: fakeUser.username,
  login: fakeUser.username,
  convertedAmount: 1000,
}
const fakeOrders = [1, 2, 3, 4, 5]

describe('Cash store tests', () => {
  let store
  beforeEach(() => {
    store = new Cash()
    // store._setInitalData()
  })

  it('jest', () => {
    expect(1 + 1).toBe(2)
    console.log(' LOG ___ store.errorEmitter ', store.errorEmitter)
  })
})
