import React from 'react'
import {shallow, mount} from 'enzyme'
import {Provider as MobxProvider} from 'mobx-react'

import Component from '../LangMenu'
import UserStore from '../../../store/User'

describe('Navigation: lang menu', () => {
  let userStore = new UserStore()
  beforeEach(() => {
    userStore = new UserStore()
  })
  describe('Markup', () => {
    it('Basic markup', () => {
      const wrapper = shallow(
        <MobxProvider>
          <Component userStore={userStore} />
        </MobxProvider>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('Component behaviour', () => {
    it('Should change langauge to rus', () => {
      userStore.changeLocale = jest.fn()
      const wrapper = mount(
        <MobxProvider>
          <Component userStore={userStore} />
        </MobxProvider>,
      )
      wrapper.find('[data-testid="ru-RU"]').simulate('click')

      expect(userStore.changeLocale).toHaveBeenCalledTimes(1)
      expect(userStore.changeLocale).toHaveBeenCalledWith('ru-RU')
    })

    it('Should change langauge to eng', () => {
      userStore.changeLocale = jest.fn()
      const wrapper = mount(
        <MobxProvider>
          <Component userStore={userStore} />
        </MobxProvider>,
      )
      wrapper.find('[data-testid="en-US"]').simulate('click')

      expect(userStore.changeLocale).toHaveBeenCalledTimes(1)
      expect(userStore.changeLocale).toHaveBeenCalledWith('en-US')
    })

    it('Should change langauge to fr', () => {
      userStore.changeLocale = jest.fn()
      const wrapper = mount(
        <MobxProvider>
          <Component userStore={userStore} />
        </MobxProvider>,
      )
      wrapper.find('[data-testid="fr-FR"]').simulate('click')

      expect(userStore.changeLocale).toHaveBeenCalledTimes(1)
      expect(userStore.changeLocale).toHaveBeenCalledWith('fr-FR')
    })

    it('Should change langauge to cn', () => {
      userStore.changeLocale = jest.fn()
      const wrapper = mount(
        <MobxProvider>
          <Component userStore={userStore} />
        </MobxProvider>,
      )
      wrapper.find('[data-testid="zh-ZH"]').simulate('click')

      expect(userStore.changeLocale).toHaveBeenCalledTimes(1)
      expect(userStore.changeLocale).toHaveBeenCalledWith('zh-ZH')
    })

  })
})
