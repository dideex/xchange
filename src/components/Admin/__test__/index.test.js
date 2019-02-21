import React from 'react'
import Component from '../index'
import {shallow} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
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
      const wrapper = shallow(
        <MemoryRouter initialEntries={['/id/12345']}>
          <MobxProvider>
            <Component />
          </MobxProvider>
        </MemoryRouter>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
