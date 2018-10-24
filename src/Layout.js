import React, {Component, Fragment} from 'react'
import {Switch, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import MenuNav from './components/Nav';
import {
  FAQ,
  Home,
  CP,
  AboutUs,
  Reserved,
  Signup,
  ThankYou,
  PaymentProof,
  PageNotFound,
} from './routes'

// Layout component;
class Layout extends Component {
  componentDidMount() {
    document.body.classList.add('loaded')
    document.body.classList.remove('loading')
  }

  render() {
    return (
      <Fragment>
        <MenuNav />
        <Header />
        <Switch>
          <Route exact path="/podtverjdenie-oplati" component={PaymentProof} />
          <Route exact path="/spasibo" component={ThankYou} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/reservi" component={Reserved} />
          <Route exact path="/o-nas" component={AboutUs} />
          <Route exact path="/lichnii-kabinet" component={CP} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/" component={Home} />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </Fragment>
    )
  }
}

export default Layout
