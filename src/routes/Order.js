import React, {Component, Fragment} from 'react'

import Content from '../components/ControlPanel/Order'
import Main from '../components/Main'
// Order component;
export class Order extends Component {
  render() {
    return (
      <Fragment>
        <Main>
          <Content />
        </Main>
      </Fragment>
    )
  }
}

export default Order