import React, {Component} from 'react'
import styled from 'react-emotion'

import {currencyFormat, StatusTitles} from '../common'

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
              <span>Кошелек для перевода:</span>
              <strong>1234 4321 1234 5643</strong>
            </Details>
            <Details>
              <span>Сумму для перевода:</span>
              <strong>{`${currencyFormat(inputValue)} ${currencyInputLabel}`}</strong>
            </Details>
          </div>
          <div>
            <Details>
              <span>Получить на кошелек:</span>
              <strong>{toWallet}</strong>
            </Details>
            <Details>
              <span>Сумму получения:</span>
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
            <span>ФИО:</span>
            <strong>{username}</strong>
          </p>
          <p>
            <span>Статус:</span>
            <strong>{StatusTitles[paymentStatus]}</strong>
          </p>
        </UserInfo>
      </Wrap>
    )
  }
}

export default DetailsComponent
