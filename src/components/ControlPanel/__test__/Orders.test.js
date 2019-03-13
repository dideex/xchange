import React from 'react'
import Component from '../Orders'
import {shallow} from 'enzyme'
import {Provider as MobxProvider} from 'mobx-react'

import Api from '../../../components/Api'

import UserStore from '../../../store/User'

import {mountWrap, testId} from '../../../helpers/router-intl-context'
import {fakeData} from '../../../helpers/fixtures'

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../../../components/common/Noty.js', () => ({
  noty: () => {},
}))

describe('Control panel: order', () => {
  let userStore
  beforeEach(() => {
    userStore = new UserStore()
    userStore.fetchGuestOrder = () => Promise.resolve({...fakeData, paymentStatus: 1})
  })

  describe('Component markup', () => {
    it('Should render without existing orders', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  
})
