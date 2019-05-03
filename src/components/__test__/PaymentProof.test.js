import React from 'react'
import {mount} from 'enzyme'
import Component, {PaymentProof} from '../PaymentProof'
import {Provider as MobxProvider} from 'mobx-react'

import {mountWrap} from '../../helpers/router-intl-context'
import {fakeCurrnecy, fakeData, fakeWallets, fakeUser} from '../../helpers/fixtures'
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

    describe('Router behaviour', () => {
      it('Component should redirect to the home when payment status is 0', () => {
        cashStore.currency = fakeCurrnecy
        cashStore.paymentStatus = 0
        userStore.wallets = fakeWallets
        const formatMessage = () => {}
        const push = jest.fn()

        const wrapper = mount(
          <PaymentProof
            {...{userStore, cashStore}}
            intl={{formatMessage}}
            history={{push}}
          />,
        )

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/')
      })

      it("Component should redirect to the 'thank you' page when payment status is 2", () => {
        cashStore.currency = fakeCurrnecy
        cashStore.paymentStatus = 2
        userStore.wallets = fakeWallets
        const formatMessage = () => {}
        const push = jest.fn()

        const wrapper = mount(
          <PaymentProof
            {...{userStore, cashStore}}
            intl={{formatMessage}}
            history={{push}}
          />,
        )

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/spasibo')
      })

      it('The go back button should work correclty', () => {
        cashStore.currency = fakeCurrnecy
        userStore.wallets = fakeWallets
        const formatMessage = () => {}
        const push = () => {}
        const goBack = jest.fn()

        const wrapper = mount(
          <PaymentProof
            {...{userStore, cashStore}}
            intl={{formatMessage}}
            history={{push, goBack}}
          />,
        )
        wrapper.find('[data-testid="payment-proof-back"]').simulate('click')

        expect(goBack).toHaveBeenCalledTimes(1)
      })

      it('The confirm payment button should work correclty', () => {
        cashStore.currency = fakeCurrnecy
        cashStore.paymentStatus = 1
        cashStore.cofirmPayment = jest.fn()
        userStore.wallets = fakeWallets
        userStore.email = fakeUser.email
        const formatMessage = () => {}
        const push = jest.fn()

        const wrapper = mount(
          <PaymentProof
            {...{userStore, cashStore}}
            intl={{formatMessage}}
            history={{push}}
          />,
        )
        wrapper.find('[data-testid="confirm-payment"]').simulate('click')

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/spasibo')
        expect(cashStore.cofirmPayment).toHaveBeenCalledTimes(1)
        expect(cashStore.cofirmPayment).toHaveBeenCalledWith(fakeUser.email)
      })
    })
  })
})
