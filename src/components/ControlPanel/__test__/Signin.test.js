import React from 'react'
import Component from '../Signin'
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
      userStore.getToken = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      const instance = wrapper.find('SignIn').instance()
      instance.handleSubmit()
      await delay()
      expect(userStore.getToken).toHaveBeenCalledTimes(0)
    })

    it("Handle submit should'n work with empty inputs", async () => {
      userStore.getToken = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      wrapper.find('SignIn').setState({usernameError: true, passwordError: true})
      const instance = wrapper.find('SignIn').instance()
      instance.handleSubmit()
      await delay()
      expect(userStore.getToken).toHaveBeenCalledTimes(0)
    })

    it('Handle submit should work', async () => {
      userStore.getToken = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      userStore.changeUsername = fakeUser.username
      userStore.changePassword = fakeUser.password
      wrapper.find('SignIn').setState({usernameError: false, passwordError: false})
      const instance = wrapper.find('SignIn').instance()
      instance.handleSubmit()
      await delay()
      expect(userStore.getToken).toHaveBeenCalledTimes(1)
    })
  })

  describe('Form bahavriour', () => {
    it('Login field should change', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      wrapper
        .find('input[placeholder="Login"]')
        .simulate('change', {target: {value: fakeLogin}})
      expect(userStore.login).toBe(fakeLogin)
      expect(wrapper.find('input[placeholder="Login"]').instance().value).toBe(fakeLogin)
    })

    it('Error fields should appear', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      wrapper.find('button').simulate('click')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it.only('Error fields should hide when problem solves', async () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      wrapper.find('button').simulate('click')
      wrapper
        .find('input[placeholder="Login"]')
        .simulate('change', {target: {value: fakeLogin}})
      wrapper
        .find('input[type="password"]')
        .simulate('change', {target: {value: fakePassword}})

      await delay(() => {}, 500)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Password field should change', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      wrapper
        .find('input[type="password"]')
        .simulate('change', {target: {value: fakePassword}})
      expect(userStore.password).toBe(fakePassword)
      expect(wrapper.find('input[type="password"]').instance().value).toBe(fakePassword)
    })

    it('Button click should submit the form', async () => {
      userStore.getToken = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      userStore.changeUsername = fakeUser.username
      userStore.changePassword = fakeUser.password
      wrapper.find('SignIn').setState({usernameError: false, passwordError: false})
      wrapper.find('button').simulate('click')
      await delay()
      expect(userStore.getToken).toHaveBeenCalledTimes(1)
    })
  })
})
