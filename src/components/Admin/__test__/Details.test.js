import React from 'react'
import Component from '../Details'
import {shallow, mount} from 'enzyme'
import {MobxProvider} from '../../../helpers/mobx'
import CashStore from '../../../store/Cash'
import Api from '../../Api'

const fakeData = {
  id: 'Test id',
  inputValue: 'Test input',
  toWallet: 'Test wallet',
  fromWallet: 'Tests fromWallet',
  outputValue: 'Tests outputValue',
  email: 'Tests email',
  username: 'Tests username',
  paymentStatus: 0,
  loading: false,
  wallets: {
    eth: 'eth wallet',
    bitcoint: 'bitcoint wallet',
    rur: 'rur wallet',
  },
  login: 'Test login',
  updatePaymentStatus() {},
}

const fakeCurrnecy = [
  {order: 2, _id: 2, icon: 'bitcoin', id: 'bitcoin', name: 'lisk'},
  {order: 1, _id: 1, icon: 'eth', id: 'eth', name: 'tether'},
  {order: 3, _id: 3, icon: 'rur', id: 'rur', name: 'litecoin'},
]

describe('Admin details', () => {
  let cashStore
  beforeEach(() => {
    cashStore = new CashStore()
  })

  describe('Markup', () => {
    it('Base markup', () => {
      cashStore.currency = fakeCurrnecy
      const wrapper = shallow(
        <MobxProvider cashStore={cashStore}>
          <Component {...fakeData} />
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Show wallets markup', () => {
      cashStore.currency = fakeCurrnecy
      const wrapper = shallow(
        <MobxProvider cashStore={cashStore}>
          <Component {...fakeData} cashStore={cashStore} />
        </MobxProvider>,
      ).dive().dive()
      console.log(wrapper.debug())
      wrapper.setState({showWallets: true})
      console.log(cashStore.currency)
      console.log(wrapper.instance().state)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
