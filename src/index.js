import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/Layout'
import * as serviceWorker from './serviceWorker'
import {Provider as MobxProvider} from 'mobx-react'
import {BrowserRouter} from 'react-router-dom'

import Cash from './store/Cash'

if (module.hot) {
  module.hot.accept()
}

const app = (
  <MobxProvider cashStore={Cash}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MobxProvider>
)

ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister()
