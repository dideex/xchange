import React from 'react'
import Component from '../Signin'
import {Provider as MobxProvider} from 'mobx-react'

import UserStore from '../../../store/User'

import {mountWrap} from '../../../helpers/router-intl-context'
import {fakeData} from '../../../helpers/fixtures'

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
  })

  describe('Component methods bahavriour', () => {
    it('Errors should be cleared after cDM', () => {
      userStore.clearErr = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      expect(userStore.clearErr).toHaveBeenCalledTimes(1)
    })

    it('Window should scroll to the header after cDM', () => {
      const {scrollTo} = window
      window.scrollTo = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      window.scrollTo = scrollTo
    })

    it('Passwrod should be changed after cWU', () => {
      userStore.changePassword = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      wrapper.unmount()
      expect(userStore.changePassword).toHaveBeenCalledTimes(1)
      expect(userStore.changePassword).toHaveBeenCalledWith('')
    })
  })

  describe('Form bahavriour', () => {
    it('Basic markup', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
    })
  })
})
