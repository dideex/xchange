import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import styled from 'react-emotion'

import {Button, format, currencyFormat, H2, statusArray} from './common'
import Svg from './HowTo/Step2'

const Wrap = styled('div')`
  & {
    padding: 0 60px;
  }
  & button {
    width: 37%;
    display: block;
    margin: 50px auto 0;
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
  }
  & p {
    display: flex;
    justify-content: space-between;
  }
`

// TODO: add wallet for payment
// TODO: add click to copy
// PaymentProof component;
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
    const {id: currencyOutputId, label: currencyOutputLabel} = cashStore.currency[
      cashStore.currencyOutput
    ]

    const {label: currencyInputLabel} = cashStore.currency[cashStore.currencyInput]
    return (
      <Wrap>
        <H2>Совершите перевод</H2>
        <Details>
          <div ref={this.wrap}>
            <Details>
              <span>Кошелек для перевода:</span>
              <strong>1234 4321 1234 5643</strong>
            </Details>
            <Details>
              <span>Сумму для перевода:</span>
              <strong>{`${currencyFormat(
                cashStore.inputValue,
              )} ${currencyInputLabel}`}</strong>
            </Details>
          </div>
          <div>
            <Details>
              <span>Получить на кошелек:</span>
              <strong>
                {format(userStore.wallets[currencyOutputId], '____ ____ ____ ____')}
              </strong>
            </Details>
            <Details>
              <span>Сумму получения:</span>
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
            <span>ФИО:</span>
            <strong>{userStore.username}</strong>
          </p>
          <p>
            <span>Статус:</span>
            <strong>{statusArray[cashStore.paymentStatus]}</strong>
          </p>
        </UserInfo>
        <p onClick={() => this.props.history.goBack()}>
          <span role="img" aria-label="back">👈</span> Вернуться
        </p>
        <Button
          caption="Я перевел"
          toggle={() => {
            cashStore.cofirmPayment()
            this.props.history.push('/spasibo')
          }}
        />
        <Svg />
      </Wrap>
    )
  }
}

export default withRouter(PaymentProof)
