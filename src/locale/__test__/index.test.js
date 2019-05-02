import React from 'react'
import Component from '../index'
import {shallow} from 'enzyme'
import {FormattedMessage} from 'react-intl'

import UserStore from '../../store/User'

describe('Locale', () => {
  let userStore = new UserStore()
  beforeEach(() => {
    userStore = new UserStore()
  })
  it('Should render without crashes', () => {
    const wrapper = shallow(<Component userStore={userStore} />)
    wrapper.unmount()
  })
  describe('locales', () => {
    it('Russian locale should exist', () => {
      userStore.locale = 'ru-RU'
      const wrapper = shallow(
        <Component userStore={userStore}>
          <FormattedMessage id="test" />
        </Component>,
      )
      
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('English locale should exist', () => {
      userStore.locale = 'en-US'
      const wrapper = shallow(
        <Component userStore={userStore}>
          <FormattedMessage id="test" />
        </Component>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('France locale should exist', () => {
      userStore.locale = 'fr-FR'
      const wrapper = shallow(
        <Component userStore={userStore}>
          <FormattedMessage id="test" />
        </Component>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Chainise locale should exist', () => {
      userStore.locale = 'zh-ZH'
      const wrapper = shallow(
        <Component userStore={userStore}>
          <FormattedMessage id="test" />
        </Component>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
