import React, {Component, Fragment} from 'react'

import Content from '../components/PaymentProof'
import Main from '../components/Main'
// PaymentProof component; The page will been appear when user have created a new order
export class PaymentProof extends Component {
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

export default PaymentProof
