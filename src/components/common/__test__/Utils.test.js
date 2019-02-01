import {
  format,
  currencyFormat,
  isAllPropsFalse,
  parseOrders,
  linesToParagraphs,
  ScrollTo
} from '../Utils'

describe('Utils test', () => {
  it('Format test', () => {
    expect(format('1234', '__ __')).toMatchSnapshot()
    expect(format('12341234', '__ __')).toMatchSnapshot()
    expect(format('qwe', '__ __')).toMatchSnapshot()
    expect(format('1234', '_ _ _ _')).toMatchSnapshot()
    expect(format('12341234', '_ _ _ _')).toMatchSnapshot()
    expect(format('qwe', '_ _ _ _')).toMatchSnapshot()
    expect(format('12345678', '____')).toMatchSnapshot()
    expect(format('12345678', '_ __ __ __ _')).toMatchSnapshot()
    expect(format('12345678')).toMatchSnapshot()
    expect(format('123')).toMatchSnapshot()
  })

  it('Currency format tests', () => {
    expect(currencyFormat(100)).toMatchSnapshot()
    expect(currencyFormat(1e3)).toMatchSnapshot()
    expect(currencyFormat(1e6)).toMatchSnapshot()
    expect(currencyFormat(1e15)).toMatchSnapshot()
    expect(currencyFormat(.005)).toMatchSnapshot()
    expect(currencyFormat(.1)).toMatchSnapshot()
    expect(currencyFormat(.0)).toMatchSnapshot()
    expect(currencyFormat(100.1)).toMatchSnapshot()
    expect(currencyFormat(100.100000000001)).toMatchSnapshot()
    expect(currencyFormat(-100)).toMatchSnapshot()
    expect(currencyFormat('100')).toMatchSnapshot()
    expect(currencyFormat('100.1')).toMatchSnapshot()
  })

  it('isAllPropsFalse tests', () => {
    expect(isAllPropsFalse({a: 1, b: 2, c: 3})).toBeFalsy()
    expect(isAllPropsFalse({a: 1, b: 2, c: null})).toBeFalsy()
    expect(isAllPropsFalse({a: false, b: false, c: false})).toBeTruthy()
  })

  it('parseOrders tests', () => {
    const order = [
      {
        _id: '_id',
        created: 'Fri Jan 25 2019 12:02:35',
        inputValue: 1,
        currencyInputLabel: 'Btc',
        outputValue: 10000,
        currencyOutputLabel: 'Rur',
        paymentStatus: 2,
        toWallet: '1234 4321 1234 4321',
      },
    ]

    expect(parseOrders(order)).toMatchSnapshot()

    const order2 = [
      {
        _id: 'New id',
        created: 'Fri Jul 25 2015 10:02:35',
        inputValue: 1000,
        currencyInputLabel: 'Rur',
        outputValue: 1,
        currencyOutputLabel: 'Eth',
        paymentStatus: 1,
        toWallet: '9999999999999',
      },
    ]

    expect(parseOrders(order2)).toMatchSnapshot()
  })

  it('Lines to parahgraphs tests', () => {
    expect(linesToParagraphs('Some string')).toMatchSnapshot()
    expect(linesToParagraphs('Some string\n with new line')).toMatchSnapshot()
    expect(linesToParagraphs('Some string\n with new line\n and another line')).toMatchSnapshot()
  })

  it('ScrollTo behavioure', () => {
    window.pageYOffset = 100
    window.requestAnimationFrame = jest.fn(fn => fn(10))
    window.scrollTo = jest.fn()
    ScrollTo(0)
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)
    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 100)
  })
})
