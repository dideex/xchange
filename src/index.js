import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './Layout'
import * as serviceWorker from './serviceWorker'
import {Provider as MobxProvider} from 'mobx-react'
import {BrowserRouter} from 'react-router-dom'

// custom i18n provider, based on react-intl
import IntlProvider from './locale'

// base lib's css
import 'noty/lib/noty.css'
import 'noty/lib/themes/metroui.css'
import './Noty.css'
import './fonts.css'
import './reset.css'
// Mobx stores
import {cash, user, lastOperations} from './store'

// hot module replacement
if (module.hot) {
  module.hot.accept()
}

export const App = (
  <MobxProvider lastOperationsStore={lastOperations} cashStore={cash} userStore={user}>
    <IntlProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </IntlProvider>
  </MobxProvider>
)

ReactDOM.render(App, document.getElementById('root'))

serviceWorker.unregister()
