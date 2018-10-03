import React, {Component, Fragment} from 'react'
import {Switch, Route} from 'react-router-dom'

import {FAQ, IndexPage, NotFound} from './Routes'
import Navigation from './Nav'

// Layout component;
class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Navigation />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/faq" component={FAQ} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    )
  }
}

export default Layout
