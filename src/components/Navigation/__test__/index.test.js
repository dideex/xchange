import React from 'react'
import {Provider as MobxProvider} from 'mobx-react'
import RDD from 'react-device-detect'

import Component from '../index'
import UserStore from '../../../store/User'
import {fakeUser} from '../../../helpers/fixtures'
import {mountWrap} from '../../../helpers/router-intl-context'

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
  })
})