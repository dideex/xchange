import React from 'react'
import Component from '../Settings'
import {shallow} from 'enzyme'
import {MobxProvider} from '../../../helpers/mobx'
import {fakeCurrnecy} from '../../../helpers'
import CashStore from '../../../store/Cash'
import UserStore from '../../../store/User'

describe('Settings behaviour', () => {
  let cashStore
  let userStore
  beforeEach(() => {
    cashStore = new CashStore()
    userStore = new UserStore()
  })

  describe('Markup', () => {
    it('Basic markup', () => {
      const wrapper = shallow(
        <MobxProvider>
          <Component />
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Currency markup', () => {
      cashStore.currency = fakeCurrnecy
      const wrapper = shallow(<Component cashStore={cashStore} userStore={userStore} />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
