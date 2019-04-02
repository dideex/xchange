import React from 'react'
import Component from '../index'
import {shallow} from 'enzyme'
import {Provider as MobxProvider} from 'mobx-react'

import {fakeCurrnecy} from '../../../helpers'
import {mountWrap} from '../../../helpers/router-intl-context'
import {wrapInTestContext} from '../../../helpers/dnd'
import CashStore from '../../../store/Cash'
import UserStore from '../../../store/User'

import Api from '../../Api'

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../../../components/common/Noty.js', () => ({
  noty: () => {},
}))

describe('Converter index', () => {
  let cashStore = new CashStore()
  let userStore = new UserStore()
  Api.get = () => Promise.resolve({data: fakeCurrnecy, userRate: 1})
  beforeAll(() => {
    cashStore = new CashStore()
    cashStore.userRate = 1
    cashStore.fetchCurrency = () => Promise.Resolve
    userStore = new UserStore()
  })
  describe('Markup', () => {
    it('Basic markup', () => {
      const wrapper = mountWrap(
        <MobxProvider cashStore={cashStore} userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })
    it('Loading component', () => {
      cashStore.loading = true
      const wrapper = mountWrap(
        <MobxProvider cashStore={cashStore} userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('Component behaviour',() => {
    it('Should fetch currnecy after mounting', () => {
      const fetchCurrency = jest.fn(() => Promise.resolve())
      cashStore.fetchCurrency = fetchCurrency
      const wrapper = mountWrap(
        <MobxProvider cashStore={cashStore} userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      expect(fetchCurrency).toHaveBeenCalledTimes(1)
    })
  })
})
