import React from 'react'
import Component from '../index'
import {shallow} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'

import {MobxProvider} from '../../../helpers/mobx'
import CashStore from '../../../store/Cash'
import UserStore from '../../../store/User'

import Api from '../../../components/Api'

import {delay} from '../../../helpers'

import {mountWrap} from '../../../helpers/router-intl-context'

const btc = {
  _id: 'test id',
  paymentStatus: 1,
  toWallet: 'Test to wallet',
  fromWallet: 'Test from wallet',
  created: '1/1/1970',
  inputValue: '100',
  outputValue: '1000',
  currencyInputLabel: 'Btc',
  currencyOutputLabel: 'Eth',
  wallets: {Btc: 'tset wallet'},
  login: 'Test login',
  user: 'Test user',
}

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../../../components/common/Noty.js', () => ({
  noty: () => {},
}))

describe('Settings behaviour', () => {
  let cashStore
  let userStore
  beforeEach(() => {
    cashStore = new CashStore()
    userStore = new UserStore()
    userStore.isAdmin = true
  })

  describe('Markup', () => {
    Api.get = () => Promise.resolve({data: btc})
    it('Basic markup', () => {
      const wrapper = shallow(
        <MobxProvider>
          <MemoryRouter>
            <Component />
          </MemoryRouter>
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should not allow unauthorisation user', async () => {
      userStore.isAdmin = null
      Api.get = () => Promise.resolve({data: btc})
      const wrapper = await mountWrap(
        <MobxProvider cashStore={cashStore} userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      wrapper.update()
      expect(window.location.href).toMatchSnapshot()
    })

    it('With order id user', async () => {
      userStore.isAdmin = true
      const wrapper = mountWrap(
        <MobxProvider cashStore={cashStore} userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      await delay()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('With order id guest', async () => {
      userStore.isAdmin = true
      Api.get = () => Promise.resolve({data: btc, user: 'Guest'})
      const wrapper = mountWrap(
        <MobxProvider cashStore={cashStore} userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      await delay()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('Methods behavriour', () => {
    it('Udpate payment status should be invoked after clicking at ', async () => {
      userStore.isAdmin = true
      userStore.token = 'fake token'
      Api.get = () => Promise.resolve({data: btc})
      const wrapper = await mountWrap(
        <MobxProvider cashStore={cashStore} userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      wrapper.update()
      Api.post = jest.fn(() => Promise.resolve({data: btc}))
      wrapper
        .find('[title="Перевести в статус Ожидает перевода"]')
        .first()
        .simulate('click')
      expect(Api.post).toHaveBeenCalledTimes(1)
      expect(Api.post).toHaveBeenCalledWith(
        'summaryOrderChangeStatus',
        expect.anything(),
        'fake token',
      )
    })

    it('Fetch orders should invoke socket emitter', async () => {
      userStore.isAdmin = true
      userStore.token = 'fake token'
      userStore.paymentStatus = 3
      const emitSocket = jest.fn()
      Api.get = () => Promise.resolve({data: btc})
      const wrapper = await mountWrap(
        <MobxProvider cashStore={{...cashStore, emitSocket}} userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      wrapper.update()
      Api.post = jest.fn(() => Promise.resolve({data: btc}))
      wrapper
        .find('[title="Перевести в статус Переведено"]')
        .first()
        .simulate('click')
      await delay()
      expect(emitSocket).toHaveBeenCalledTimes(1)
    })

    describe('Payment status', () => {
      it('Fetch orders when payment status all', () => {
        userStore.isAdmin = true
        userStore.token = 'fake token'
        Api.get = () => Promise.resolve({data: btc})
        const wrapper = mountWrap(
          <MobxProvider cashStore={cashStore} userStore={userStore}>
            <Component />
          </MobxProvider>,
        )

        Api.get = jest.fn(() => Promise.resolve({data: btc}))
        const instance = wrapper.find('Admin').instance()
        instance._fetchOrdersByPaymentStatus('all')
        expect(Api.get).toHaveBeenCalledTimes(1)
        expect(Api.get).toHaveBeenCalledWith('summaryOrders', '/all', userStore.token)
      })

      it('Fetch orders when payment status created', () => {
        userStore.isAdmin = true
        userStore.token = 'fake token'
        Api.get = () => Promise.resolve({data: btc})
        const wrapper = mountWrap(
          <MobxProvider cashStore={cashStore} userStore={userStore}>
            <Component />
          </MobxProvider>,
        )

        Api.get = jest.fn(() => Promise.resolve({data: btc}))
        const instance = wrapper.find('Admin').instance()
        instance._fetchOrdersByPaymentStatus('created')
        expect(Api.get).toHaveBeenCalledTimes(1)
        expect(Api.get).toHaveBeenCalledWith('summaryOrders', '/created', userStore.token)
      })

      describe("Payment select's list bahvriour", () => {
        it('Should fire callback after clicking at button "All"', async () => {
          userStore.isAdmin = true
          userStore.token = 'fake token'
          Api.get = () => Promise.resolve({data: btc})
          const wrapper = await mountWrap(
            <MobxProvider cashStore={cashStore} userStore={userStore}>
              <Component />
            </MobxProvider>,
          )

          wrapper.update()
          Api.get = jest.fn(() => Promise.resolve({data: btc}))
          wrapper.find('div[data-testid="payment_selector_all"]').simulate('click')
          expect(Api.get).toHaveBeenCalledTimes(1)
          expect(Api.get).toHaveBeenCalledWith('summaryOrders', '/all', userStore.token)
        })

        it('Should fire callback after clicking at button "Created"', async () => {
          userStore.isAdmin = true
          userStore.token = 'fake token'
          Api.get = () => Promise.resolve({data: btc})
          const wrapper = await mountWrap(
            <MobxProvider cashStore={cashStore} userStore={userStore}>
              <Component />
            </MobxProvider>,
          )

          wrapper.update()
          Api.get = jest.fn(() => Promise.resolve({data: btc}))
          wrapper.find('div[data-testid="payment_selector_created"]').simulate('click')
          expect(Api.get).toHaveBeenCalledTimes(1)
          expect(Api.get).toHaveBeenCalledWith(
            'summaryOrders',
            '/created',
            userStore.token,
          )
        })

        it('Should fire callback after clicking at button "Expectation"', async () => {
          userStore.isAdmin = true
          userStore.token = 'fake token'
          Api.get = () => Promise.resolve({data: btc})
          const wrapper = await mountWrap(
            <MobxProvider cashStore={cashStore} userStore={userStore}>
              <Component />
            </MobxProvider>,
          )

          wrapper.update()
          Api.get = jest.fn(() => Promise.resolve({data: btc}))
          wrapper
            .find('div[data-testid="payment_selector_expectation"]')
            .simulate('click')
          expect(Api.get).toHaveBeenCalledTimes(1)
          expect(Api.get).toHaveBeenCalledWith(
            'summaryOrders',
            '/expectation',
            userStore.token,
          )
        })

        it('Should fire callback after clicking at button "Closed"', async () => {
          userStore.isAdmin = true
          userStore.token = 'fake token'
          Api.get = () => Promise.resolve({data: btc})
          const wrapper = await mountWrap(
            <MobxProvider cashStore={cashStore} userStore={userStore}>
              <Component />
            </MobxProvider>,
          )

          wrapper.update()
          Api.get = jest.fn(() => Promise.resolve({data: btc}))
          wrapper.find('div[data-testid="payment_selector_closed"]').simulate('click')
          expect(Api.get).toHaveBeenCalledTimes(1)
          expect(Api.get).toHaveBeenCalledWith(
            'summaryOrders',
            '/closed',
            userStore.token,
          )
        })
      })
    })
  })
})
