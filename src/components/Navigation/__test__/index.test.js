import React from 'react'
import {Provider as MobxProvider} from 'mobx-react'

import Component from '../index'
import UserStore from '../../../store/User'
import {fakeUser} from '../../../helpers/fixtures'
import {mountWrap} from '../../../helpers/router-intl-context'

describe('Navigation: index', () => {
  let userStore = new UserStore()
  beforeEach(() => {
    userStore = new UserStore()
  })
  describe('Markup', () => {
    it('Basic markup', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('Component behavriour', () => {
  })
})
