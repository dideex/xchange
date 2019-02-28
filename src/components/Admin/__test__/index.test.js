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

import {delay} from '../../../helpers'

const btc = {
  _id: 'test id',
  paymentStatus: 1,
  toWallet: 'Test to wallet',
  fromWallet: 'Test from wallet',
  created: '1/1/1970',
  inputValue: 100,
  outputValue: 1000,
  currencyInputLabel: 'Btc',
  currencyOutputLabel: 'Eth',
}
const eth = {
  _id: 'test id eth',
  paymentStatus: 2,
  toWallet: 'Test to wallet eth',
  fromWallet: 'Test from wallet eth',
  created: '1/1/2070',
  inputValue: 1000,
  outputValue: 100,
  currencyInputLabel: 'Eth',
  currencyOutputLabel: 'Btc',
}

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
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
        id: 'test id',
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
    Api.get = () => Promise.resolve({data: btc, eth})
    it('Basic markup', () => {
      const wrapper = shallow(
        <MobxProvider>
          <MemoryRouter>
            <Component />
          </MemoryRouter>
        </MobxProvider>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it.only('With order id', async () => {
      userStore.isAdmin = true
      const wrapper = mountWrap(<Component cashStore={cashStore} userStore={userStore} />)
      await delay()
      console.log(wrapper.html())
      // expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
