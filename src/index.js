import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './Layout'
import * as serviceWorker from './serviceWorker'
import {Provider as MobxProvider} from 'mobx-react'
import {BrowserRouter} from 'react-router-dom'

import IntlProvider from './locale'

import 'noty/lib/noty.css'
import 'noty/lib/themes/metroui.css'
import './Noty.css'
import './fonts.css'
import './reset.css'
import {cash, user, lastOperations} from './store'

if (module.hot) {
  module.hot.accept()
}


const app = (
  <MobxProvider lastOperationsStore={lastOperations} cashStore={cash} userStore={user}>
    <IntlProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </IntlProvider>
  </MobxProvider>
)

ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister()
