import React from 'react'
import Component from '../Signup'
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
    it('Should redirect when token is exist', () => {
      userStore.token = true
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      // FIXME: add history.push observer
      expect(wrapper.html()).toMatchSnapshot()
    })

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

    it('Handle submit should not work with untouched inputs', async () => {
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

    it('Handle submit should not work with empty inputs', async () => {
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

      userStore.changeLogin(fakeUser.username)
      userStore.changeUsername(fakeUser.username)
      userStore.changePassword(fakeUser.password)
      userStore.changeEmail(fakeUser.email)
      wrapper.find('SignUp').setState({
        usernameError: false,
        passwordError: false,
        emailError: false,
        passwordRepeated: fakeUser.password,
      })
      wrapper
        .find('SignUp')
        .instance()
        .handleSubmit()
      await delay()
      expect(userStore.signupUser).toHaveBeenCalledTimes(1)
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

    it('Username field should change', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      wrapper
        .find('input[placeholder="Full name"]')
        .simulate('change', {target: {value: fakeUser.fio}})
      expect(userStore.username).toBe(fakeUser.fio)
      expect(wrapper.find('input[placeholder="Full name"]').instance().value).toBe(
        fakeUser.fio,
      )
    })

    it('Email field should change', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      wrapper
        .find('input[placeholder="Email"]')
        .simulate('change', {target: {value: fakeUser.email}})
      expect(userStore.email).toBe(fakeUser.email)
      expect(wrapper.find('input[placeholder="Email"]').instance().value).toBe(
        fakeUser.email,
      )
    })

    it('Password field should change', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      wrapper
        .find('input[placeholder="Password"]')
        .simulate('change', {target: {value: fakeUser.password}})
      expect(userStore.password).toBe(fakeUser.password)
      expect(wrapper.find('input[placeholder="Password"]').instance().value).toBe(
        fakeUser.password,
      )
    })

    it('Repeat password field should change', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      wrapper
        .find('input[placeholder="Repeat password"]')
        .simulate('change', {target: {value: fakeUser.password}})
      expect(
        wrapper
          .find('SignUp')
          .instance()
          .state.passwordRepeated,
      ).toBe(fakeUser.password)
      expect(wrapper.find('input[placeholder="Repeat password"]').instance().value).toBe(
        fakeUser.password,
      )
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

    it('Error fields should hide when problem solves', async () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      wrapper.find('button').simulate('click')
      wrapper
        .find('input[placeholder="Full name"]')
        .simulate('change', {target: {value: fakeUser.fio}})
      wrapper
        .find('input[placeholder="Email"]')
        .simulate('change', {target: {value: fakeUser.email}})
      wrapper
        .find('input[placeholder="Password"]')
        .simulate('change', {target: {value: fakeUser.password}})
      wrapper
        .find('input[placeholder="Repeat password"]')
        .simulate('change', {target: {value: fakeUser.password}})

      await delay(() => {}, 500)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
