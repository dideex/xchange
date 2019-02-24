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

import Common from '../../common'

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve(),
  get: () => Promise.resolve(),
  errorEmitter: jest.fn(data => fn => data(fn)),
}))

jest.mock('../../../components/common/Noty.js', () => ({
  noty: () => {},
  // Loading: () => <div>Loading</div>,
  // Virtualized: () => {},
  // parseOrders: () => {},
  // StatusTitles:  {},
  // MainSectionWrap: () => {},
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
        id: 123,
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
  })

  describe('Markup', () => {
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

    it.only('With order id', () => {
      const wrapper = mountWrap(
        <div initialEntries={['/', '/page/10', '/next']}>
          <Component cashStore={cashStore} userStore={userStore} />
        </div>,
      )
      console.log(wrapper.debug())
      // expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
