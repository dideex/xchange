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
  describe('Component behavriour', () => {
     
    it('Auth toggler should invoke after click', () => {
      const toggleAuthMenu = jest.fn(() => {})
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component {...props} toggleAuthMenu={toggleAuthMenu} />
        </MobxProvider>,
      )
      wrapper.find('.auth-menu-item').simulate('click')

      expect(toggleAuthMenu).toHaveBeenCalledTimes(1)
    })

    it('Lang toggler should invoke after click', () => {
      const toggleLangMenu = jest.fn(() => {})
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component {...props} toggleLangMenu={toggleLangMenu} />
        </MobxProvider>,
      )
      wrapper.find('[data-testid="lang-toggler"]').simulate('click')

      expect(toggleLangMenu).toHaveBeenCalledTimes(1)
    })

    it('Close toggler should invoke after mouse leave', () => {
      const closeBothMenu = jest.fn(() => {})
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component {...props} closeBothMenu={closeBothMenu} />
        </MobxProvider>,
      )
      wrapper.find('DesktopMenu').simulate('mouseleave')

      expect(closeBothMenu).toHaveBeenCalledTimes(1)
    })

  })
})
