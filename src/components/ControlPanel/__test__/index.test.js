import React from 'react'
import Component from '../index'
import {Provider as MobxProvider} from 'mobx-react'

import UserStore from '../../../store/User'
import CashStore from '../../../store/Cash'

import {mountWrap} from '../../../helpers/router-intl-context'
import {fakeData, fakeUser, fakeCurrnecy} from '../../../helpers/fixtures'
import {delay} from '../../../helpers'

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../../../components/common/Noty.js', () => ({
  noty: () => {},
}))

describe('Control panel: signin', () => {
  let userStore
  let cashStore
  beforeEach(() => {
    userStore = new UserStore()
    cashStore = new CashStore()
    userStore.fetchGuestOrder = () => Promise.resolve({...fakeData, paymentStatus: 1})
  })

  describe('Component markup', () => {
    it('Basic sigin markup', () => {
      const wrapper = mountWrap(
        <MobxProvider {...{cashStore, userStore}}>
          <Component />
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Basic sigup markup', () => {
      userStore.token = fakeUser.token
      userStore.email = fakeUser.email
      userStore.username = fakeUser.username
      userStore.orders = [fakeData]
      const wrapper = mountWrap(
        <MobxProvider {...{cashStore, userStore}}>
          <Component />
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Component methods bahavriour', () => {
  })

  describe('Form bahavriour', () => {
  })
})
