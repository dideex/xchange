import React from 'react'
import Component from '../index'
import {shallow, mount} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
import {createMemoryHistory} from 'history'

import {MobxProvider} from '../../../helpers/mobx'
import {fakeCurrnecy} from '../../../helpers'
import CashStore from '../../../store/Cash'
import UserStore from '../../../store/User'

import {BrowserRouter} from 'react-router-dom'
import {shape} from 'prop-types'

import Api from '../../../components/Api'

import Common from '../../common'

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: 'Btc', currency: 'Eth'}),
  errorEmitter: data => fn => data(fn),
}))

jest.mock('../../../components/common/Noty.js', () => ({
  noty: () => {},
}))

// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {
      path: '/location',
    },
    match: {
      path: '/location',
      params: {
        id: 'Teste order id',
      },
    },
  },
}

const createContext = () => ({
  context: {router},
  childContextTypes: {router: shape({})},
})

export function mountWrap(node) {
  return mount(node, createContext())
}

export function shallowWrap(node) {
  return shallow(node, createContext())
}

describe('Settings behaviour', () => {
  let cashStore
  let userStore
  beforeEach(() => {
    cashStore = new CashStore()
    userStore = new UserStore()
    userStore.isAdmin = true
  })

  describe('Markup', () => {
    it.only('Basic markup', () => {
      const wrapper = shallow(
        <MobxProvider>
          <MemoryRouter>
            <Component />
          </MemoryRouter>
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it.only('With order id', () => {
      Api.errorEmitter = fn => data => fn(data)
      const wrapper = mountWrap(<Component cashStore={cashStore} userStore={userStore} />)
      // console.log(wrapper.html())
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
