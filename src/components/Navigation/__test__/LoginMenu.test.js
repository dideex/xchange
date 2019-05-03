import React from 'react'
import {Provider as MobxProvider} from 'mobx-react'

import Component from '../LoginMenu'
import UserStore from '../../../store/User'
import {mountWrap} from '../../../helpers/router-intl-context'
import {fakeUser} from '../../../helpers/fixtures'
import {delay} from '../../../helpers'

describe('Navigation: lang menu', () => {
  let userStore = new UserStore()
  const props = {
    handleClick: () => {},
  }
  beforeEach(() => {
    userStore = new UserStore()
  })
  describe('Markup', () => {
    it('Unauth', () => {
      const wrapper = mountWrap(
        <MobxProvider>
          <Component userStore={userStore} {...props} />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Authed', () => {
      userStore.token = fakeUser.token
      userStore.login = fakeUser.username
      const wrapper = mountWrap(
        <MobxProvider>
          <Component userStore={userStore} {...props} />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Admin', () => {
      userStore.token = fakeUser.token
      userStore.isAdmin = true
      userStore.login = fakeUser.username
      const wrapper = mountWrap(
        <MobxProvider>
          <Component userStore={userStore} {...props} />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('Component behavriour', () => {
    it('Sign in link should invoke handle fn', () => {
      const handleClick = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider>
          <Component userStore={userStore} handleClick={handleClick} />
        </MobxProvider>,
      )
  
      wrapper.find('[href="/lichnii-kabinet"]').simulate('click')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('Register link should invoke handle fn', () => {
      const handleClick = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider>
          <Component userStore={userStore} handleClick={handleClick} />
        </MobxProvider>,
      )
  
      wrapper.find('[href="/registracya"]').simulate('click')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('CP link should invoke handle fn', () => {
      userStore.token = fakeUser.token
      userStore.login = fakeUser.username

      const handleClick = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider>
          <Component userStore={userStore} handleClick={handleClick} />
        </MobxProvider>,
      )
  
      wrapper.find('[href="/lichnii-kabinet"]').simulate('click')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('Logout link should invoke handle fn', async () => {
      userStore.token = fakeUser.token
      userStore.login = fakeUser.username
      const logout = jest.fn()
      userStore.signout = logout

      const wrapper = mountWrap(
        <MobxProvider>
          <Component userStore={userStore} {...props} />
        </MobxProvider>,
      )
  
      wrapper.find('[data-testid="logout"]').simulate('click')

      await delay()
      expect(logout).toHaveBeenCalledTimes(1)
    })
  })
})
