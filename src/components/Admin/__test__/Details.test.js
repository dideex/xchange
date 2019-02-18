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
      const wrapper = mount(<Component {...fakeData} cashStore={cashStore} />)
      wrapper.find('ul').simulate('click')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Orders data should have been get from the store', () => {
      cashStore.paymentStatus = 2
      cashStore.inputValue = 500
      cashStore.outputValue = 1000
      const wrapper = mount(<Component {...fakeData} cashStore={cashStore} />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
