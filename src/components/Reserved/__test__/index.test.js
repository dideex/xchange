import React from 'react'
import {Provider as MobxProvider} from 'mobx-react'
import Component from '../index'

import CashStore from '../../../store/Cash'
import {mountWrap} from '../../../helpers/router-intl-context'
import {fakeCurrnecy} from '../../../helpers/fixtures'


jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../../../components/common/Noty.js', () => ({
  noty: () => {},
}))


describe('Reserved', () => {
  let cashStore = new CashStore()
  beforeEach(() => {
    cashStore = new CashStore()
  })

  describe('Markup', () => {
    it('Basic markup', () => {
      const wrapper = mountWrap(
        <MobxProvider cashStore={cashStore}>
          <Component />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Basic markup with fake currencies', () => {
      cashStore.currency = fakeCurrnecy
      const wrapper = mountWrap(
        <MobxProvider cashStore={cashStore}>
          <Component />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
