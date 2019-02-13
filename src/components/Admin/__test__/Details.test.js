import React from 'react'
import Component from '../Details'
import {shallow} from 'enzyme'
// import {MobxProvider} from '../../../helpers/mobx'

import {cash} from '../../../store'

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
  let cashStore = ''
  beforeAll(() => {
    cashStore = cash.create()
  })

  describe('Markup', () => {
    it('Base markup', () => {
      const wrapper = shallow(<Component cashStore={cashStore} date={{}} />)
      console.log(wrapper)
      // expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
