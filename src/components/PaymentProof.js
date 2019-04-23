import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import styled from 'react-emotion'
import {FormattedMessage, injectIntl} from 'react-intl'

import DetailsComp from './ControlPanel/Details'
import {Button, format, H2} from './common'
import Svg from './HowTo/Step2'

const Wrap = styled('div')`
  & {
    padding: 0 60px;
    @media (max-width: 1024px) {
      padding: 0 5px;
    }
  }
  & button {
    width: 37%;
    display: block;
    margin: 50px auto 0;
    @media (max-width: 1024px) {
      width: 100%;
    }
  }
  & svg {
    width: 30%;
    display: block;
    margin: 50px auto 30px;
  }
  & > p {
    text-align: center;
    cursor: pointer;
  }
`

// TODO: add click to copy
// PaymentProof component;
@withRouter
@inject('userStore')
@inject('cashStore')
@injectIntl
@observer
class PaymentProof extends Component {
  constructor(props) {
    super(props)
    this.wrap = React.createRef()
  }

  componentDidMount() {
    window.scrollTo(
      0,
      this.wrap.current.getBoundingClientRect().top + window.pageYOffset - 150,
    )
    // Protect route
    if (this.props.cashStore.paymentStatus === 0) this.props.history.push('/')
    if (this.props.cashStore.paymentStatus === 2) this.props.history.push('/spasibo')
  }

  render() {
    const {cashStore, userStore} = this.props
    const {formatMessage} = this.props.intl
    const {id: currencyOutputId, label: currencyOutputLabel, mask} =
      cashStore.currency[cashStore.currencyOutput] || {}
    const {label: currencyInputLabel} = cashStore.currency[cashStore.currencyInput] || {}
    console.log(' LOG ___ cashStore.currencyInput ', cashStore.currencyInput)
    return (
      <Wrap>
        <div ref={this.wrap}>
          <H2>
            <FormattedMessage id="proof.header" defaultMessage="Совершите перевод" />
          </H2>
        </div>
        <DetailsComp
          id={cashStore.orderId}
          inputValue={cashStore.inputValue}
          outputValue={cashStore.outputValue}
          currencyInputLabel={currencyInputLabel}
          currencyOutputLabel={currencyOutputLabel}
          toWallet={format(userStore.wallets[currencyOutputId], mask)}
          sourceWallet={cashStore.currency[cashStore.currencyInput].source}
          email={userStore.email}
          username={userStore.username}
          paymentStatus={cashStore.paymentStatus}
        />
        <p onClick={() => this.props.history.goBack()}>
          <span role="img" aria-label="back">
            👈
          </span>
          <FormattedMessage id="details.back" defaultMessage="Вернуться" />
        </p>
        <Button
          caption={formatMessage({id: 'details.accept', defaultMessage: 'Я перевел'})}
          toggle={() => {
            cashStore.cofirmPayment(userStore.email)
            this.props.history.push('/spasibo')
          }}
        />
        <Svg />
      </Wrap>
    )
  }
}

export default PaymentProof
