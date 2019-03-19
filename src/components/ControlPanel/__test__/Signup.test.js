import React from 'react'
import Component from '../Signup'
import {shallow} from 'enzyme'
import {Provider as MobxProvider} from 'mobx-react'

import UserStore from '../../../store/User'

import {mountWrap} from '../../../helpers/router-intl-context'
import {fakeData, fakeUser} from '../../../helpers/fixtures'
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
  const fakeLogin = 'Fake login'
  const fakePassword = 'Fakepassword'
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

    it('Password should be cleaned after cWU', () => {
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

    it("Handle submit shouldn't work with untouched inputs", async () => {
      userStore.signupUser = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      const instance = wrapper.find('SignUp').instance()
      instance.handleSubmit()
      await delay()
      expect(userStore.signupUser).toHaveBeenCalledTimes(0)
    })

    it("Handle submit should'n work with empty inputs", async () => {
      userStore.signupUser = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      wrapper
        .find('SignUp')
        .setState({usernameError: true, passwordError: true, emailError: true})
      const instance = wrapper.find('SignUp').instance()
      instance.handleSubmit()
      await delay()
      expect(userStore.signupUser).toHaveBeenCalledTimes(0)
    })

    it('Handle submit should work', async () => {
      userStore.signupUser = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      userStore.changeUsername = fakeUser.username
      userStore.changePassword = fakeUser.password
      wrapper
        .find('SignUp')
        .setState({
          usernameError: true,
          passwordError: true,
          emailError: true,
          passwordRepeated: fakeUser.password,
        })
      const instance = wrapper.find('SignUp').instance()
      instance.handleSubmit()
      await delay()
      expect(userStore.signupUser).toHaveBeenCalledTimes(1)
    })
  })

  describe('Form bahavriour', () => {})
})
