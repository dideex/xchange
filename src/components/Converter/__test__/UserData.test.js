import React from 'react'
import Component from '../UserData'
import {shallow} from 'enzyme'
import {Provider as MobxProvider} from 'mobx-react'

import CashStore from '../../../store/Cash'
import UserStore from '../../../store/User'
import {mountWrap} from '../../../helpers/router-intl-context'
import {fakeCurrnecy, fakeUser} from '../../../helpers/fixtures'

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../../../components/common/Noty.js', () => ({
  noty: () => {},
}))

describe('Converter: user data tests', () => {
  let cashStore = new CashStore()
  let userStore = new UserStore()
  const props = {walletIncome: 0, walletOutgo: 1}
  afterEach(() => {
    cashStore = new CashStore()
    cashStore.currency = fakeCurrnecy
    userStore = new UserStore()
  })

  describe('Mark up', () => {
    const wrapper = mountWrap(
      <MobxProvider userStore={userStore} cashStore={cashStore}>
        <Component {...props} />
      </MobxProvider>,
    )
    it('Basic mark up', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
    it('Email should change', () => {
      userStore.changeEmail(fakeUser.email)
      console.log(userStore.email)
      wrapper.find('input[placeholder="Email"]').value = 1000
      console.log(wrapper.find('input[placeholder="Email"]').value)
      wrapper.update()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
