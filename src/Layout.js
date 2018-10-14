import React, {Component, Fragment} from 'react'
import {Switch, Route} from 'react-router-dom'

import {FAQ, Home, CP, AboutUs, Reserved, Signup, ThankYou} from './routes'
import Navigation from './components/Nav'
import NotFound from './routes/404';

// Layout component;
class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Navigation />
        <Switch>
          <Route exact path="/spasibo" component={ThankYou} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/reservi" component={Reserved} />
          <Route exact path="/o-nas" component={AboutUs} />
          <Route exact path="/lichnii-kabinet" component={CP} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound}/>
        </Switch>
      </Fragment>
    )
  }
}

export default Layout
