import React from 'react'
import {format, currencyFormat, isAllPropsFalse} from '../Utils'
import {shallow, mount} from 'enzyme'

describe('Utils test', () => {
  it('Format test', () => {
    expect(format('1234','__ __')).toMatchSnapshot()
    expect(format('12341234','__ __')).toMatchSnapshot()
    expect(format('qwe','__ __')).toMatchSnapshot()
    expect(format('1234','_ _ _ _')).toMatchSnapshot()
    expect(format('12341234','_ _ _ _')).toMatchSnapshot()
    expect(format('qwe','_ _ _ _')).toMatchSnapshot()
    expect(format('12345678','____')).toMatchSnapshot()
    expect(format('12345678','_ __ __ __ _')).toMatchSnapshot()
    expect(format('12345678')).toMatchSnapshot()
    expect(format('123')).toMatchSnapshot()
  })

  it('Currency format tests', () => {
    expect(currencyFormat(100)).toMatchSnapshot()
    expect(currencyFormat(1e3)).toMatchSnapshot()
    expect(currencyFormat(1e6)).toMatchSnapshot()
    expect(currencyFormat(1e15)).toMatchSnapshot()
    expect(currencyFormat(.005)).toMatchSnapshot()
    expect(currencyFormat(.100)).toMatchSnapshot()
    expect(currencyFormat(.00)).toMatchSnapshot()
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
})