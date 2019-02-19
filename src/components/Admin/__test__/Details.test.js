import React from 'react'
import Component from '../Details'
import {shallow, mount} from 'enzyme'
import {MobxProvider} from '../../../helpers/mobx'
import CashStore from '../../../store/Cash'
import Api from '../../Api'

const fakeData = {
  id: 'Test id',
  inputValue: '1000',
  toWallet: 'Test wallet',
  fromWallet: 'Tests fromWallet',
  outputValue: '2000',
  email: 'Tests email',
  username: 'Tests username',
  paymentStatus: 1,
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

    describe('Payment status', () => {
      it('Payment status should be not created', () => {
        const wrapper = shallow(
          <Component {...fakeData} cashStore={cashStore} paymentStatus={0} />,
        )
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('Payment status should be wait for transactions', () => {
        const wrapper = shallow(
          <Component {...fakeData} cashStore={cashStore} paymentStatus={1} />,
        )
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('Payment status should be wait for accept', () => {
        const wrapper = shallow(
          <Component {...fakeData} cashStore={cashStore} paymentStatus={2} />,
        )
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('Payment status should be closed', () => {
        const wrapper = shallow(
          <Component {...fakeData} cashStore={cashStore} paymentStatus={3} />,
        )
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('Payment status should be canceled', () => {
        const wrapper = shallow(
          <Component {...fakeData} cashStore={cashStore} paymentStatus={4} />,
        )
        expect(wrapper.html()).toMatchSnapshot()
      })
    })
  })

  describe('Component behavriour', () => {
    it('Stop propagation after click on <li />', () => {
      cashStore.currency = fakeCurrnecy
      const wrapper = mount(<Component {...fakeData} cashStore={cashStore} />)
      wrapper.find('ul').simulate('click')
      wrapper.find('li').first().simulate('click')
      expect(wrapper.find('DetailsComponent').state().showWallets).toBeTruthy()
    })
  })
})
