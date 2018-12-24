import Cash from '../Cash'
import Api from '../../components/Api'
import openSocket from 'socket.io-client'
import currencies from './currencies.json'
import currency from './currencies'

// jest.mock('socket.io-client', jest.fn)

jest.mock('../../components/Api', () => ({
  post: () => {},
  get: () => Promise.resolve({data: {}}),
  errorEmitter: jest.fn(data => fn => data(fn)),
}))

const sortedData = [
  {order: 1, id: 0, name: 'eth'},
  {order: 2, id: 1, name: 'bitcoin'},
  {order: 3, id: 2, name: 'rur'},
]

const unsortedData = [
  {order: 2, id: 'bitcoin', name: 'lisk'},
  {order: 1, id: 'eth', name: 'tether'},
  {order: 3, id: 'rur', name: 'litecoin'},
]

const fakeData = {
  data: sortedData,
  userRate: 0.9,
}
const fakeUnsortData = {
  data: unsortedData,
  userRate: 0.9,
}

describe('Cash store tests', () => {
  let store
  beforeEach(() => {
    store = new Cash()
  })

  it('jest', () => {
    expect(1 + 1).toBe(2)
  })

  it('Fetch currency data', async () => {
    Api.get = jest.fn(() => Promise.resolve(fakeData))

    await store.fetchCurrency()
    expect(Api.get).toHaveBeenCalledTimes(1)
    expect(Api.get).toHaveBeenCalledWith('currency')
    expect(store.userRate).toBe(fakeData.userRate)
    expect(store.currency).toEqual(expect.arrayContaining(fakeData.data))
    expect(store.loading).toBe(false)
  })

  it('Fetch currency data and sort it', async () => {
    Api.get = jest.fn(() => Promise.resolve(fakeUnsortData))

    await store.fetchCurrency()
    const sortedData = Object.values(fakeUnsortData.data)
      .sort((a, b) => a.order - b.order)
      .map((row, i) => ({...row, id: i}))
    expect(store.currency).toEqual(expect.arrayContaining(sortedData))
  })
})

describe('Cash store currencies', () => {
  let store
  beforeEach(() => {
    Api.get = jest.fn(() => Promise.resolve(currencies))
    store = new Cash()
  })

  it('Init currency', () => {
    console.log(" LOG ___ currencies.data ", currencies.data )
    console.log(" LOG ___ currencies.data ", store.currency )
    expect(store.currency).toBe(expect.arrayContaining(currencies.data))
  })
})
