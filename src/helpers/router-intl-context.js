import {mount} from 'enzyme'
import {BrowserRouter} from 'react-router-dom'
import {IntlProvider, intlShape} from 'react-intl'
import {shape} from 'prop-types'

import messages from '../locale/en.json'

export const testId = 'test id'

// Instantiate router context
const router = {
  history: {...new BrowserRouter().history},
  route: {
    location: {
      path: '/location',
      href: '/location',
    },
    match: {
      path: '/location',
      params: {
        id: testId,
      },
    },
  },
}

// const createContext = () => ({
//   context: {router},
//   childContextTypes: {router: shape({})},
// })

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

// export function shallowWrap(node) {
//   return shallow(node, createContext())
// }
