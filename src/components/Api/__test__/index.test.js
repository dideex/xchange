import Api from '../index'
import {shallow} from 'enzyme'

jest.mock('../../../components/common/Noty.js', () => ({
  noty: () => {},
}))

const postApiHeader = (token = null, data = {}) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `bearer ${token}`,
  },
  body: JSON.stringify(data),
})
const getApiHeader = (token = null) => ({
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `bearer ${token}`,
  },
})

const fakeEndpoint = 'Test_endpoint'
const fakeToken = 'fake token'
const fakeParams = '?id=fake'
const fakeData = {
  fakeRow: 'fake row',
  fakeColumn: 'fake column',
}

describe('Api tests', () => {
  describe('Api post bahaviour', () => {
    it('Post should invoke fetch post correctly', () => {
      window.fetch = jest.fn(() => Promise.resolve({json() {}}))
      Api.post(fakeEndpoint, fakeData, fakeToken)
      expect(window.fetch).toHaveBeenCalledTimes(1)
      expect(window.fetch).toHaveBeenCalledWith(
        `http://176.119.158.145:3030/api/${fakeEndpoint}`,
        postApiHeader(fakeToken, fakeData),
      )
    })

    it('Post should invoke without a token', () => {
      window.fetch = jest.fn(() => Promise.resolve({json() {}}))
      Api.post(fakeEndpoint, fakeData)
      expect(window.fetch).toHaveBeenCalledTimes(1)
      expect(window.fetch).toHaveBeenCalledWith(
        `http://176.119.158.145:3030/api/${fakeEndpoint}`,
        postApiHeader(null, fakeData),
      )
    })

    it('Post should invoke without a data', () => {
      window.fetch = jest.fn(() => Promise.resolve({json() {}}))
      Api.post(fakeEndpoint)
      expect(window.fetch).toHaveBeenCalledTimes(1)
      expect(window.fetch).toHaveBeenCalledWith(
        `http://176.119.158.145:3030/api/${fakeEndpoint}`,
        postApiHeader(),
      )
    })
  })
  describe('Api get behaviour', () => {
    it('Get should invoke fetch get correctly', () => {
      window.fetch = jest.fn(() => Promise.resolve({json() {}}))
      Api.get(fakeEndpoint, fakeParams, fakeToken)
      expect(window.fetch).toHaveBeenCalledTimes(1)
      expect(window.fetch).toHaveBeenCalledWith(
        `http://176.119.158.145:3030/api/${fakeEndpoint}${fakeParams}`,
        getApiHeader(fakeToken, fakeData),
      )
    })

    it('Get should invoke fetch get without a data', () => {
      window.fetch = jest.fn(() => Promise.resolve({json() {}}))
      Api.get(fakeEndpoint, '', fakeToken)
      expect(window.fetch).toHaveBeenCalledTimes(1)
      expect(window.fetch).toHaveBeenCalledWith(
        `http://176.119.158.145:3030/api/${fakeEndpoint}`,
        getApiHeader(fakeToken),
      )
    })

    it('Get should invoke fetch get without a token', () => {
      window.fetch = jest.fn(() => Promise.resolve({json() {}}))
      Api.get(fakeEndpoint)
      expect(window.fetch).toHaveBeenCalledTimes(1)
      expect(window.fetch).toHaveBeenCalledWith(
        `http://176.119.158.145:3030/api/${fakeEndpoint}`,
        getApiHeader(),
      )
    })
    
  })
})
