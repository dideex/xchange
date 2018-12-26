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

describe('Cash store currencies behaviour', () => {
  let store

  beforeEach(() => {
    Api.get = jest.fn(() => Promise.resolve(currencies))
    store = new Cash()
  })

  it('Init currency', () => {
    expect(store.userRate).toBe(currencies.userRate)
    expect(store.currencyInput).toBe(0)
    expect(store.currencyOutput).toBe(2)
    store.currency.forEach((currency, i) => {
      expect(currency).toMatchObject(currencies.data[i])
    })
  })

  it('Swap currencies', () => {
    store.setCurrencyOutput(0)
    expect(store.currencyInput).toBe(2)
    expect(store.currencyOutput).toBe(0)
    store.setCurrencyOutput(2)
    expect(store.currencyInput).toBe(0)
    expect(store.currencyOutput).toBe(2)
    store.setCurrencyOutput(1)
    expect(store.currencyInput).toBe(0)
    expect(store.currencyOutput).toBe(1)
    store.setCurrencyOutput(0)
    expect(store.currencyInput).toBe(1)
    expect(store.currencyOutput).toBe(0)
  })
})

describe('Behaviour currnecy calculate', () => {
  let store
  const btcRate = currencies.data[0].price_usd * currencies.userRate
  const ethRate = currencies.data[1].price_usd * currencies.userRate
  const rurRate = currencies.data[2].price_usd * currencies.userRate

  beforeEach(() => {
    Api.get = jest.fn(() => Promise.resolve(currencies))
    store = new Cash()
  })

  it('Change input value', () => {
    store.changeInput('100')
    expect(store.inputValue).toBe('100')
    expect(store.outputValue).toBe(store.inputValue * btcRate)
    store.changeInput('200')
    expect(store.inputValue).toBe('200')
    expect(store.outputValue).toBe(store.inputValue * btcRate)
    store.changeInput('800')
    expect(store.inputValue).toBe('800')
    expect(store.outputValue).toBe(store.inputValue * btcRate)
  })

  it('Change output value', () => {
    store.changeOutput('100')
    expect(store.outputValue).toBe('100')
    expect(store.inputValue).toBe(store.outputValue / (4 * currencies.userRate))
    store.changeOutput('400')
    expect(store.outputValue).toBe('400')
    expect(store.inputValue).toBe(store.outputValue / (4 * currencies.userRate))
    store.changeOutput('500')
    expect(store.outputValue).toBe('500')
    expect(store.inputValue).toBe(store.outputValue / (4 * currencies.userRate))
  })

  it('Change input currency', () => {
    store.changeOutput('100')
    expect(store.outputValue).toBe('100')
    expect(store.inputValue).toBe(store.outputValue / (4 * currencies.userRate))
    store.setCurrencyInput(1)
    expect(store.inputValue).toBe(store.outputValue / (2 * currencies.userRate))
    store.changeOutput('200')
    expect(store.inputValue).toBe(store.outputValue / (2 * currencies.userRate))
    store.setCurrencyInput(0)
    expect(store.inputValue).toBe(store.outputValue / (4 * currencies.userRate))
  })

  it('Change output currency', () => {
    store.changeInput('100')
    store.setCurrencyOutput(1)
    expect(store.inputValue).toBe('100')
    expect(store.outputValue).toBe(store.inputValue * ethRate)
    store.setCurrencyOutput(2)
    expect(store.outputValue).toBe(store.inputValue * btcRate)
    store.changeInput('400')
    store.setCurrencyOutput(1)
    expect(store.inputValue).toBe('400')
    expect(store.outputValue).toBe(store.inputValue * ethRate)
    store.setCurrencyOutput(2)
    expect(store.outputValue).toBe(store.inputValue * btcRate)
  })
})
