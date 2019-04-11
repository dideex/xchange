import React from 'react'
import {Provider as MobxProvider} from 'mobx-react'

import Component from '../LoginMenu'
import UserStore, { user } from '../../../store/User'
import {mountWrap} from '../../../helpers/router-intl-context'
import {fakeUser} from '../../../helpers/fixtures'

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
})
