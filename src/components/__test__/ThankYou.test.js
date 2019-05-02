import React from 'react'
import Component from '../ThankYou'

import CashStore from '../../store/Cash'
import UserStore from '../../store/User'
import {mountWrap} from '../../helpers/router-intl-context'

jest.mock('../Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../common/Noty.js', () => ({
  noty: () => {},
}))

describe('Thank you page', () => {
  let cashStore = new CashStore()
  let userStore = new UserStore()
  beforeEach(() => {
    cashStore = new CashStore()
    userStore = new UserStore()
    })
  describe('Markup', () => {
    it('Basic markup unauth', () => {
      cashStore.orderId = 'test_order_id'
      const wrapper = mountWrap(<Component {...{userStore, cashStore}} />)

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Basic markup unauth', () => {
      userStore.token = true
      const wrapper = mountWrap(<Component {...{userStore, cashStore}} />)

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('Component behviour', () => {
    it('Button should work', () => {
      const push = jest.fn()
      const wrapper = mountWrap(<Component {...{userStore, cashStore}} history={{push}} />)

      wrapper.find('button').simulate('click')
      // TODO: test this <Route > behaviour
    })
  })
})
