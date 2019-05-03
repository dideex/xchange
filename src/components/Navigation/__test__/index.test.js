import React from 'react'
import {Provider as MobxProvider} from 'mobx-react'
import RDD from 'react-device-detect'

import Component from '../index'
import UserStore from '../../../store/User'
import {mountWrap} from '../../../helpers/router-intl-context'
import Utils from '../../common/Utils'

jest.mock('../../common/Utils', () => ({
  ScrollTo: () => Promise.resolve({data: {}}),
}))

jest.mock('react-device-detect', () => ({
  isMobile: false,
}))

describe('Navigation: index', () => {
  let userStore = new UserStore()
  beforeEach(() => {
    userStore = new UserStore()
    RDD.isMobile = false
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

    it('Mobile basic markup', () => {
      RDD.isMobile = true
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })

    describe('Menu markup', () => {
      it('Not minimized nav', () => {
        const wrapper = mountWrap(
          <MobxProvider userStore={userStore}>
            <Component />
          </MobxProvider>,
        )
        wrapper.find('Nav').setState({minimizeNav: true})

        expect(wrapper.html()).toMatchSnapshot()
      })

      it('Not hidden menu', () => {
        const wrapper = mountWrap(
          <MobxProvider userStore={userStore}>
            <Component />
          </MobxProvider>,
        )
        wrapper.find('Nav').setState({hideMenu: true})

        expect(wrapper.html()).toMatchSnapshot()
      })

      it('Both not hidden', () => {
        const wrapper = mountWrap(
          <MobxProvider userStore={userStore}>
            <Component />
          </MobxProvider>,
        )
        wrapper.find('Nav').setState({hideMenu: true, minimizeNav: true})

        expect(wrapper.html()).toMatchSnapshot()
      })
    })
  })
  describe('Component behavriour', () => {
    describe('Scroll behaviour', () => {
      it('cDM should add event listner', () => {
        const wrapper = mountWrap(
          <MobxProvider userStore={userStore}>
            <Component />
          </MobxProvider>,
        )

        const instance = wrapper.find('Nav').instance()
        global.window.addEventListener = jest.fn()
        instance.componentDidMount()
        expect(global.window.addEventListener).toHaveBeenCalledTimes(1)
        expect(global.window.addEventListener).toHaveBeenCalledWith(
          'scroll',
          instance._handleScroll,
        )
      })

      it('cWU should remove that listner', () => {
        const wrapper = mountWrap(
          <MobxProvider userStore={userStore}>
            <Component />
          </MobxProvider>,
        )

        const instance = wrapper.find('Nav').instance()
        global.window.removeEventListener = jest.fn()
        instance.componentWillUnmount()
        expect(global.window.removeEventListener).toHaveBeenCalledTimes(1)
        expect(global.window.removeEventListener).toHaveBeenCalledWith(
          'scroll',
          instance._handleScroll,
        )
      })
    })
    describe('Scroll behaviour', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      const instance = wrapper.find('Nav').instance()
      beforeEach(() => {
        global.window.pageYOffset = 0
        instance.lastOffsetTop = 0
      })
      it('Handle scroll should show nav menu', () => {
        global.window.pageYOffset = 101
        instance._handleScroll()
        expect(instance.state.minimizeNav).toBeTruthy()
      })

      it('Handle scroll should hide nav menu', () => {
        global.window.pageYOffset = 80
        instance._handleScroll()
        expect(instance.state.minimizeNav).toBeFalsy()
      })

      it('Handle scroll should show menu on scroll down more than 200px from the top', () => {
        global.window.pageYOffset = 201
        instance._handleScroll()
        expect(instance.state.hideMenu).toBeTruthy()
      })

      it('Handle scroll should show hide on scroll up', () => {
        global.window.pageYOffset = 501
        instance._handleScroll()
        global.window.pageYOffset = 401
        instance._handleScroll()
        expect(instance.state.hideMenu).toBeFalsy()
      })

      it('Handle scroll should show hide on scroll down', () => {
        global.window.pageYOffset = 501
        instance._handleScroll()
        global.window.pageYOffset = 401
        instance._handleScroll()
        global.window.pageYOffset = 402
        instance._handleScroll()
        expect(instance.state.hideMenu).toBeTruthy()
      })
    })

    describe('State behaviour', () => {
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      const instance = wrapper.find('Nav').instance()
      const initialState = {
        minimizeNav: false,
        hideMenu: false,
        showLangMenu: false,
        showAuthMenu: false,
        showMobMenu: false,
      }
      beforeEach(() => {
        instance.setState(initialState)
      })

      it('Mobile menu should toggle after clicking', () => {
        RDD.isMobile = true

        const wrapper = mountWrap(
          <MobxProvider userStore={userStore}>
            <Component />
          </MobxProvider>,
        )
        wrapper.find('[data-testid="mob-menu-toggler"]').simulate('click')
        expect(instance.state.showMobMenu).toBeFalsy()
      })

      it('Toggle lang menu should toggle lang menu and hide auth menu', () => {
        instance.toggleLangMenu({showLangMenu: false})
        expect(instance.state.showLangMenu).toBeTruthy()
        expect(instance.state.showAuthMenu).toBeFalsy()

        instance.toggleLangMenu({showLangMenu: true})
        expect(instance.state.showLangMenu).toBeFalsy()
        expect(instance.state.showAuthMenu).toBeFalsy()
      })

      it('Toggle auth menu should toggle auth menu and hide lang menu', () => {
        instance.toggleAuthMenu({showAuthMenu: false})
        expect(instance.state.showAuthMenu).toBeTruthy()
        expect(instance.state.showLangMenu).toBeFalsy()

        instance.toggleAuthMenu({showAuthMenu: true})
        expect(instance.state.showAuthMenu).toBeFalsy()
        expect(instance.state.showLangMenu).toBeFalsy()
      })

      it('Toggle mobile menu should toggle mobile menu and hide lang menu', () => {
        instance.toggleMobMenu({showMobMenu: false})
        expect(instance.state.showMobMenu).toBeTruthy()
        expect(instance.state.showLangMenu).toBeFalsy()

        instance.toggleMobMenu({showMobMenu: true})
        expect(instance.state.showMobMenu).toBeFalsy()
        expect(instance.state.showLangMenu).toBeFalsy()
      })

      it('Close all popovers should work', () => {
        instance.setState({
          showLangMenu: true,
          showAuthMenu: true,
          showMobMenu: true,
        })
        instance.closeAllPopovers()
        expect(instance.state.showMobMenu).toBeFalsy()
        expect(instance.state.showLangMenu).toBeFalsy()
        expect(instance.state.showAuthMenu).toBeFalsy()
      })

      it('Handle click should close menues and scroll to main', () => {
        Utils.ScrollTo = jest.fn()
        instance.setState({
          showLangMenu: true,
          showMobMenu: true,
        })
        const top = 100
        const getBoundingClientRect = jest.fn(() => ({top}))
        document.querySelector = () => ({
          getBoundingClientRect,
        })
        instance.handleClick()
        expect(instance.state.showMobMenu).toBeFalsy()
        expect(instance.state.showLangMenu).toBeFalsy()
        expect(getBoundingClientRect).toHaveBeenCalledTimes(1)
        expect(Utils.ScrollTo).toHaveBeenCalledTimes(1)
        expect(Utils.ScrollTo).toHaveBeenCalledWith(top)
      })
    })
  })
})
