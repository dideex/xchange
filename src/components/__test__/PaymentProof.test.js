import React from 'react'
import Component from '../PaymentProof'
import {Provider as MobxProvider} from 'mobx-react'

import {mountWrap} from '../../helpers/router-intl-context'
import {fakeCurrnecy, fakeData, fakeWallets} from '../../helpers/fixtures'
import UserStore from '../../store/User'
import CashStore from '../../store/Cash'

jest.mock('../Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../common/Noty.js', () => ({
  noty: () => {},
}))

describe('Paymentproof', () => {
  let userStore = new UserStore()
  let cashStore = new CashStore()
  beforeEach(() => {
    userStore = new UserStore()
    cashStore = new CashStore()
  })

  describe('Markup', () => {
    it('Basic markup', () => {
      cashStore.currency = fakeCurrnecy
      cashStore.orderId = fakeData.id
      cashStore.inputValue = fakeData.inputValue
      cashStore.outputValue = fakeData.outputValue
      userStore.email = fakeData.email
      userStore.username = fakeData.username
      userStore.wallets = fakeWallets
      const wrapper = mountWrap(
        <MobxProvider {...{userStore, cashStore}}>
          <Component />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('Component behavriour', () => {
    it('cDM should scroll the window', () => {
      cashStore.currency = fakeCurrnecy
      cashStore.orderId = fakeData.id
      cashStore.inputValue = fakeData.inputValue
      cashStore.outputValue = fakeData.outputValue
      userStore.email = fakeData.email
      userStore.username = fakeData.username
      userStore.wallets = fakeWallets

      window.scrollTo = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider {...{userStore, cashStore}}>
          <Component />
        </MobxProvider>,
      )

      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, -150)
    })
  })
})
