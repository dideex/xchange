import React from 'react'
import Component from '../Details'
import {shallow} from 'enzyme'
import {MobxProvider} from '../../../helpers/mobx'
import CashStore from '../../../store/Cash'

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
  wallets: {},
  login: 'Test login',
  updatePaymentStatus() {},
}

describe('Admin details', () => {
  let cashStore
  beforeEach(() => {
    cashStore = new CashStore()
  })

  describe('Markup', () => {
    it('Base markup', () => {
      const wrapper = shallow(
        <MobxProvider cashStore={cashStore}>
          <Component {...fakeData} />
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
