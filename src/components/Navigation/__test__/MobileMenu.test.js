import React from 'react'
import {Provider as MobxProvider} from 'mobx-react'

import Component from '../MobileMenu'
import UserStore from '../../../store/User'
import {fakeUser} from '../../../helpers/fixtures'
import {mountWrap} from '../../../helpers/router-intl-context'

const NO_OP = () => {}
describe('Navigation: lang menu', () => {
  const props = {
    handleClick: NO_OP,
    showLangMenu: false,
    showMobMenu: false,
    closeBothMenu: NO_OP,
  }
  let userStore = new UserStore()
  beforeEach(() => {
    userStore = new UserStore()
  })
  describe('Markup', () => {
    it('Basic markup', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component  {...props} />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should render lang menu', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component  {...props} showLangMenu />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should render mob menu', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component  {...props} showMobMenu />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('Component behavriour', () => {
    it('Handle click should invoke on clicking', () => {
      const handleClick = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component  {...props} handleClick={handleClick} />
        </MobxProvider>,
      )
      wrapper.find('[data-testid="mobile-menu-lang"]').simulate('click')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('Close menu should invoke on clicking', () => {
      const closeBothMenu = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component  {...props} closeBothMenu={closeBothMenu} />
        </MobxProvider>,
      )
      wrapper.find('#close').simulate('click')

      expect(closeBothMenu).toHaveBeenCalledTimes(1)
    })
  })
})
