import React, {Component} from 'react'
import styled from 'react-emotion'
import {FormattedMessage} from 'react-intl'

import {currencyFormat, StatusTitles} from '../common'

const Wrap = styled('div')`
  & {
    padding: 0 60px;
    @media (max-width: 1024px) {
      padding: 0 15px;
    }
    @media (max-width: 767px) {
      padding: 0;
    }
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
    flex-wrap: wrap;
    @media (max-width: 1024px) {
      justify-content: center;
    }
  }
  & > * {
    flex: 40% 0 0;
    @media (max-width: 1024px) {
      flex: 70% 0 0;
    }
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
// DetailsComponent component;
class DetailsComponent extends Component {
  render() {
    const {
      id,
      inputValue,
      currencyInputLabel,
      toWallet,
      outputValue,
      currencyOutputLabel,
      email,
      username,
      paymentStatus,
    } = this.props
    return (
      <Wrap>
        <h3>Перевод № {id}</h3>
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
              <strong>1234 4321 1234 5643</strong>
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
            <span>Email:</span>
            <strong>{email}</strong>
          </p>
          <p>
            <span>
              <FormattedMessage id="details.username" defaultMessage="ФИО:" />
            </span>
            <strong>{username}</strong>
          </p>
          <p>
            <FormattedMessage id="home.lastOperations.status" defaultMessage="Статус:" />
            <strong>
              <FormattedMessage
                id={`home.lastOperations.status${StatusTitles[paymentStatus]}`}
                defaultMessage={StatusTitles[paymentStatus]}
              />
            </strong>
          </p>
        </UserInfo>
      </Wrap>
    )
  }
}

export default DetailsComponent
