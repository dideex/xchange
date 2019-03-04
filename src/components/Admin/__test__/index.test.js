import React from 'react'
import Component from '../index'
import {shallow, mount} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'

import {MobxProvider} from '../../../helpers/mobx'
import CashStore from '../../../store/Cash'
import UserStore from '../../../store/User'

import {BrowserRouter} from 'react-router-dom'
import {shape} from 'prop-types'

import Api from '../../../components/Api'

import {delay} from '../../../helpers'

import {IntlProvider, intlShape} from 'react-intl'

import messages from '../../../locale/en.json'

const btc = {
  _id: 'test id',
  paymentStatus: 1,
  toWallet: 'Test to wallet',
  fromWallet: 'Test from wallet',
  created: '1/1/1970',
  inputValue: '100',
  outputValue: '1000',
  currencyInputLabel: 'Btc',
  currencyOutputLabel: 'Eth',
  wallets: {Btc: 'tset wallet'},
  login: 'Test login',
  user: 'Test user',
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

const intlProvider = new IntlProvider({locale: 'en', messages}, {})
const {intl} = intlProvider.getChildContext()

const createMixedContext = ({
  router,
  context,
  childContextTypes,
  ...additionalOptions
} = {}) => ({
  context: Object.assign({}, {router}, context, {intl}),
  childContextTypes: Object.assign(
    {},
    {router: shape({})},
    {intl: intlShape},
    childContextTypes,
  ),
  ...additionalOptions,
})

export function mountWrap(node) {
  return mount(node, createMixedContext({router}))
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
    Api.get = () => Promise.resolve({data: btc})
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

    it('With order id user', async () => {
      userStore.isAdmin = true
      const wrapper = mountWrap(
        <MobxProvider cashStore={cashStore} userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      await delay()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('With order id guest', async () => {
      userStore.isAdmin = true
      Api.get = () => Promise.resolve({data: btc, user: 'Guest'})
      const wrapper = mountWrap(
        <MobxProvider cashStore={cashStore} userStore={userStore}>
          <Component />
        </MobxProvider>,
      )
      await delay()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
