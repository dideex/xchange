import Cash from '../Cash'
import Api from '../../components/Api'
import openSocket from 'socket.io-client'

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
/* 
_id: "5bdc3a492fb62979e3105534"
base: ""
change: "-4.98"
icon: "Bitcoin"
id: 0
label: "BTC"
minimal: "0.01"
name: "Bitcoin"
order: 1
price_usd: "3881.81814302"
reserve: "10000"
source: "zzzZzzzzz"
type: "crypto" 
*/

const unsortedData = [
  {order: 2, id: 'bitcoin', name: 'bitcoin'},
  {order: 1, id: 'eth', name: 'eth'},
  {order: 3, id: 'rur', name: 'rur'},
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
