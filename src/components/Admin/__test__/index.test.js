import React from 'react'
import Component from '../index'
import {shallow} from 'enzyme'
import {Router as MemoryRouter} from 'react-router-dom'
import {createMemoryHistory} from 'history'

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
        <MemoryRouter>
          <MobxProvider>
            <Component />
          </MobxProvider>
        </MemoryRouter>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it.only('With order id', () => {
      const history = createMemoryHistory({initialEntries: [route]})
      const wrapper = shallow(
        <MemoryRouter history={history}>
          <MobxProvider>
            <Component />
          </MobxProvider>
        </MemoryRouter>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
