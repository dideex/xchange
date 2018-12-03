import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import styled from 'react-emotion'
import {withRouter} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'

import {currencyFormat, StatusTitles, Loading} from '../common'

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
  & h3 {
    text-align: center;
    margin-bottom: 30px;
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
// Guest order
@withRouter
@inject('userStore')
@observer
class Order extends Component {
  constructor(props) {
    super(props)
    this.id = props.match.params.id
    this.state = {}
  }

  componentDidMount() {
    this.props.userStore.fetchGuestOrder(this.id).then(data => this.setState(data))
  }

  render() {
    if (this.props.userStore.loading) return <Loading size="small" />
    const {
      inputValue,
      currencyInputLabel,
      toWallet,
      outputValue,
      currencyOutputLabel,
      paymentStatus,
      sourceWallet,
    } = this.state
    return (
      <Wrap>
        <h3>
          <FormattedMessage id="cp.order.num" defaultMessage="Перевод №" /> {this.id}
        </h3>
        <Details>
          <div>
            <Details>
              <span>
                <FormattedMessage
                  id="details.walletForPayment"
                  defaultMessage="Кошелек для перевода:"
                />
              </span>
              {/* //FIXME: add data from the store */}
              <strong>{sourceWallet}</strong>
            </Details>
            <Details>
              <span>
                <FormattedMessage
                  id="details.inputAmount"
                  defaultMessage="Сумму для перевода:"
                />
              </span>
              <strong>{`${currencyFormat(inputValue)} ${currencyInputLabel}`}</strong>
            </Details>
          </div>
          <div>
            <Details>
              <span>
                <FormattedMessage
                  id="details.walletForRecive"
                  defaultMessage="Получить на кошелек:"
                />
              </span>
              <strong>{toWallet}</strong>
            </Details>
            <Details>
              <span>
                <FormattedMessage
                  id="details.amountForRecieve"
                  defaultMessage="Сумму получения:"
                />
              </span>
              <strong>{`${currencyFormat(outputValue)} ${currencyOutputLabel}`}</strong>
            </Details>
          </div>
        </Details>
        <UserInfo>
          <p>
            <FormattedMessage id="home.lastOperations.status" defaultMessage="Статус:" />
            <FormattedMessage
              id={`home.lastOperations.status${StatusTitles[paymentStatus]}`}
              defaultMessage={StatusTitles[paymentStatus]}
            />
          </p>
        </UserInfo>
      </Wrap>
    )
  }
}

export default Order
