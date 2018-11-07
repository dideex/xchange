import React, {Component, Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import styled from 'react-emotion'

import {
  currencyFormat,
  statusArray,
  Loading,
  PaymentIconStatus,
  StatusTitles,
  StatusIconColors,
} from '../common'

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

const WalletsWrap = styled('ul')`
  & {
    h3 {
      cursor: pointer;
    }
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

const PaymentController = styled('div')`
  & {
    display: flex;
    justify-content: center;
    span {
      cursor: pointer;
      margin: 0 5px;
    }
  }
`
// DetailsComponent component;
@inject('cashStore')
@observer
class DetailsComponent extends Component {
  state = {
    showWallets: false,
  }

  render() {
    const {
      id,
      inputValue,
      currencyInputLabel,
      toWallet,
      fromWallet,
      outputValue,
      currencyOutputLabel,
      email,
      username,
      paymentStatus,
      loading,
      wallets,
      login,
      updatePaymentStatus,
    } = this.props
    return (
      <Wrap>
        <h3>Перевод № {id}</h3>
        <Details>
          <div>
            <Details>
              <span>Кошелек с которого перевели:</span>
              <strong>{fromWallet}</strong>
            </Details>
            <Details>
              <span>Сумма перевода:</span>
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
          {loading ? (
            <Loading size="small" />
          ) : (
            <Fragment>
              <p>
                <span>Login:</span>
                <strong>{login}</strong>
              </p>
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
                <strong>{statusArray[paymentStatus]}</strong>
              </p>
            </Fragment>
          )}
        </UserInfo>
        <PaymentController>
          {[1, 2, 3, 4].map(i => (
            <PaymentIconStatus
              key={i}
              onClick={() => updatePaymentStatus(id, i)}
              title={`Перевести в статус ${StatusTitles[i]}`}
              color={StatusIconColors[i]}
            />
          ))}
        </PaymentController>
        <WalletsWrap
          onClick={() => this.setState(({showWallets}) => ({showWallets: !showWallets}))}
        >
          {wallets && Object.values(wallets).length && <h3>Все кошельки пользователя</h3>}
          {wallets && this.state.showWallets
            ? Object.values(wallets).map((wallet, i) => (
                <li onClick={e => e.stopPropagation()} key={i}>{`${
                  this.props.cashStore.currency[i].name
                } : ${wallet}`}</li>
              ))
            : null}
        </WalletsWrap>
      </Wrap>
    )
  }
}

export default DetailsComponent
