import React, {Component, Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import {Route} from 'react-router-dom'

import Button from '../common/Button'
// PaymentProof component;
@inject('cashStore')
@inject('userStore')
@observer
class PaymentProof extends Component {
  componentDidMount() {
    if (!this.props.cashStore.paymentStatus) this.props.cashStore.createPayment()
  }
  render() {
    const {cashStore, userStore} = this.props
    return (
      <Fragment>
        <p>{userStore.username}</p>
        <p>{userStore.email}</p>
        <p>{cashStore.getInput}</p>
        <p>{cashStore.getOutput}</p>
        <p>{cashStore.paymentStatus}</p>
        <Route
          render={({history}) => (
            <Button
              caption="Done"
              toggle={() => {
                cashStore.cofirmPayment()
                history.push('/spasibo')
              }}
            />
          )}
        />
      </Fragment>
    )
  }
}

export default PaymentProof
