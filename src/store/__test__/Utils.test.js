import Cookie from 'js-cookie'
import * as utils from '../utils'
import {fakeToken} from '../__mocks__/data'

jest.mock('js-cookie', () => ({
  set: () => {},
  get: () => {},
  remove: () => {},
}))

describe('Utils test', () => {
  it('Set token test', () => {
    Cookie.set = jest.fn()
    utils.setToken(fakeToken)
    expect(Cookie.set).toHaveBeenCalledTimes(1)
    expect(Cookie.set).toHaveBeenCalledWith('token', fakeToken)
  })

  it('Set admin token', () => {
    Cookie.set = jest.fn()
    utils.setToken(fakeToken, true)
    expect(Cookie.set).toHaveBeenCalledTimes(2)
    expect(Cookie.set).toHaveBeenCalledWith('token', fakeToken)
    expect(Cookie.set).toHaveBeenCalledWith('isAdmin', true)
  })

  it('Remove token', () => {
    Cookie.remove = jest.fn()
    utils.setToken(fakeToken)
    utils.logout()
    expect(Cookie.remove).toHaveBeenCalledTimes(2)
    expect(Cookie.remove).toHaveBeenCalledWith('token')
    expect(Cookie.remove).toHaveBeenCalledWith('isAdmin')
  })

  it('Get token', () => {
    Cookie.get = jest.fn(() => fakeToken)
    const res = utils.getToken()
    expect(Cookie.get).toHaveBeenCalledTimes(1)
    expect(Cookie.get).toHaveBeenCalledWith('token')
    expect(res).toMatchSnapshot()
  })

  it('Get empty token', () => {
    Cookie.get = jest.fn()
    const res = utils.getToken()
    expect(Cookie.get).toHaveBeenCalledTimes(1)
    expect(Cookie.get).toHaveBeenCalledWith('token')
    expect(res).toBeNull()
  })

  it('Get admin status', () => {
    Cookie.get = jest.fn(() => true)
    const res = utils.getAdminStatus()
    expect(Cookie.get).toHaveBeenCalledTimes(1)
    expect(Cookie.get).toHaveBeenCalledWith('isAdmin')
    expect(res).toBeTruthy()
  })

  it('Get empty admin status', () => {
    Cookie.get = jest.fn()
    const res = utils.getAdminStatus()
    expect(Cookie.get).toHaveBeenCalledTimes(1)
    expect(Cookie.get).toHaveBeenCalledWith('isAdmin')
    expect(res).toBeNull()
  })
})
