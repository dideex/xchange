import React, {Component, Fragment} from 'react'

import Content from '../components/ThankYou'
import Main from '../components/Main'
// ThankYou component; Page will be apear after creating payment
export class ThankYou extends Component {
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

export default ThankYou
