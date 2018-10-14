import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './Layout'
import * as serviceWorker from './serviceWorker'
import {Provider as MobxProvider} from 'mobx-react'
import {BrowserRouter} from 'react-router-dom'

import {cash, user} from './store'

if (module.hot) {
  module.hot.accept()
}

const app = (
  <MobxProvider cashStore={cash} userStore={user}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </MobxProvider>
)

ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister()
