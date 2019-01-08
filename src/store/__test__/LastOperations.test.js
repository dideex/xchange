import LO from '../LastOperations'
import openSocket from 'socket.io-client'
import Api from '../../components/Api'

jest.mock('socket.io-client', url => ({
  on: data => data,
  default: () => {}
}))

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


describe('Last operations tests', () => {
  let store
  beforeEach(() => {
    store = new LO()
  })

  it('init store', () => {
    expect(store.loading).toBeTruthy()
    console.log(" LOG ___ store ", store.loading )
  })

})
