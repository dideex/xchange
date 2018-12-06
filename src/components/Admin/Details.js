import React, {Component, Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {
  currencyFormat,
  Loading,
  PaymentIconStatus,
  StatusTitles,
  StatusIconColors,
} from '../common'

const Wrap = styled('div')`
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

// DetailsComponent component; Order's data
@inject('cashStore')
@observer
class DetailsComponent extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    toWallet: PropTypes.string.isRequired,
    fromWallet: PropTypes.string.isRequired,
    outputValue: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    paymentStatus: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    wallets: PropTypes.object.isRequired,
    login: PropTypes.string.isRequired,
    updatePaymentStatus: PropTypes.func.isRequired,
  }

  state = {
    showWallets: false,
  }

  render() {
    const {
      id,
      inputValue,
      toWallet,
      fromWallet,
      outputValue,
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
              <strong>{`${currencyFormat(inputValue)} `}</strong>
            </Details>
          </div>
          <div>
            <Details>
              <span>Получить на кошелек:</span>
              <strong>{toWallet}</strong>
            </Details>
            <Details>
              <span>Сумму получения:</span>
              <strong>{`${currencyFormat(outputValue)} `}</strong>
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
                <strong>{StatusTitles[paymentStatus]}</strong>
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
                } : `}</li>
              ))
            : null}
        </WalletsWrap>
      </Wrap>
    )
  }
}

export default DetailsComponent
