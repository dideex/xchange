import React, {Component, Fragment} from 'react'

import Content from '../components/Admin'
import Main from '../components/Main'
// Summary component; Control panel main page which contains the orders
export class Summary extends Component {
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

export default Summary
