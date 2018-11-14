import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import styled from 'react-emotion'
import {FormattedMessage, injectIntl} from 'react-intl'

import {Button, format, currencyFormat, H2, StatusTitles} from './common'
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

const Details = styled('div')`
  & {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  & > * {
    flex: 40% 0 0;
  }
  & span,
  & strong {
    white-space: nowrap;
  }
`

const UserInfo = styled('div')`
  & {
    max-width: 37%;
    margin: 50px auto;
    @media (max-width: 1024px) {
      max-width: 100%;
    }
  }
  & p {
    display: flex;
    justify-content: space-between;
  }
`

// TODO: add wallet for payment
// TODO: add click to copy
// PaymentProof component;
@injectIntl
@withRouter
@inject('userStore')
@inject('cashStore')
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
    if (this.props.cashStore.paymentStatus === 0) this.props.history.push('/')
    if (this.props.cashStore.paymentStatus === 2) this.props.history.push('/spasibo')
  }

  render() {
    const {cashStore, userStore} = this.props
    const {formatMessage} = this.props.intl
    const {id: currencyOutputId, label: currencyOutputLabel, mask} =
      cashStore.currency[cashStore.currencyOutput] || {}
    const {label: currencyInputLabel} = cashStore.currency[cashStore.currencyInput] || {}
    return (
      <Wrap>
        <H2>
          <FormattedMessage id="proof.header" defaultMessage="Совершите перевод" />
        </H2>
        <Details>
          <div ref={this.wrap}>
            <Details>
              <FormattedMessage
                id="details.walletForPayment"
                defaultMessage="Кошелек для перевода:"
              />
              <strong>1234 4321 1234 5643</strong>
            </Details>
            <Details>
              <FormattedMessage
                id="details.inputAmount"
                defaultMessage="Сумму для перевода:"
              />
              <strong>{`${currencyFormat(
                cashStore.inputValue,
              )} ${currencyInputLabel}`}</strong>
            </Details>
          </div>
          <div>
            <Details>
              <FormattedMessage
                id="details.walletForRecive"
                defaultMessage="Получить на кошелек:"
              />
              <strong>{format(userStore.wallets[currencyOutputId], mask)}</strong>
            </Details>
            <Details>
              <FormattedMessage
                id="details.amountForRecieve"
                defaultMessage="Сумму получения:"
              />
              <strong>{`${currencyFormat(
                cashStore.outputValue,
              )} ${currencyOutputLabel}`}</strong>
            </Details>
          </div>
        </Details>
        <UserInfo>
          <p>
            <span>Email:</span>
            <strong>{userStore.email}</strong>
          </p>
          <p>
            <FormattedMessage id="details.username" defaultMessage="ФИО:" />
            <strong>{userStore.username}</strong>
          </p>
          <p>
            <FormattedMessage id="home.lastOperations.status" defaultMessage="Статус:" />
            <strong>
              <FormattedMessage
                id={`home.lastOperations.status${StatusTitles[cashStore.paymentStatus]}`}
                defaultMessage={StatusTitles[cashStore.paymentStatus]}
              />
            </strong>
          </p>
        </UserInfo>
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
