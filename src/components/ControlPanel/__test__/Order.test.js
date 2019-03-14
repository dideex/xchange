import React from 'react'
import Component from '../Order'
import {Provider as MobxProvider} from 'mobx-react'

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
    it('Basic markup', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should render loading', () => {
      userStore.loading = true
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  
  it('Should fetching guest order', () => {
    userStore.fetchGuestOrder = jest.fn(() => Promise.resolve())
    const wrapper = mountWrap(
      <MobxProvider userStore={userStore}>
        <Component />
      </MobxProvider>,
    )
    expect(userStore.fetchGuestOrder).toHaveBeenCalledTimes(1)
    expect(userStore.fetchGuestOrder).toHaveBeenCalledWith(testId)
  })
})
