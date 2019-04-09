import React from 'react'
import Component from '../DesktopMenu'
// import {Provider as MobxProvider} from 'mobx-react'

import UserStore from '../../../store/User'
import {mountWrap} from '../../../helpers/router-intl-context'
import {MobxProvider} from '../../../helpers/mobx'
import {delay} from '../../../helpers'

const NO_OP = () => {}

describe('Navigation: desktop menu', () => {
  let userStore = new UserStore()
  const props = {
    handleClick: NO_OP,
    showLangMenu: false,
    showAuthMenu: false,
    closeBothMenu: NO_OP,
    toggleLangMenu: NO_OP,
    toggleAuthMenu: NO_OP,
  }

  beforeEach(() => {
    userStore = new UserStore()
  })

  describe('Markup', () => {
    it('Basic markup', () => {
      const wrapper = mountWrap(<Component {...props} />)

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Lang menu', async () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component {...props} showLangMenu />
        </MobxProvider>,
      )

      await delay(() => {}, 500)
      expect(wrapper.html()).toMatchSnapshot()
    })
    it('Auth menu', async () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component {...props} showAuthMenu />
        </MobxProvider>,
      )

      await delay(() => {}, 500)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
