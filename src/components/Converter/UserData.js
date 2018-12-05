import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import styled from 'react-emotion'
import {withRouter} from 'react-router-dom'
import {injectIntl, FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'

import {Input, Button, isAllPropsFalse, Colors} from '../common'

const StyledUserData = styled('div')`
  & {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    label {
      max-width: 37%;
      flex: 37% 0 0;
      margin-bottom: 50px;
      @media (max-width: 767px) {
        max-width: 100%;
        flex: 100% 0 0;
      }
    }
  }
`

const ButtonWrap = styled('div')`
  & {
    flex: 100% 0 0;
    text-align: center;
    button {
      width: 37%;
      @media (max-width: 767px) {
        width: 100%;
      }
    }
  }
`

const CheckboxWrap = styled('div')`
  & {
    position: relative;
    flex: 37% 0 0;
    margin: 0 auto 30px;
    text-align: center;
    padding-left: 30px;
    @media (max-width: 767px) {
      flex: 100% 0 0;
    }
    input {
      display: none;
    }
  }

  label::after {
    content: '';
    position: absolute;
    display: block;
    left: 13px;
    top: 0;
    bottom: 7px;
    margin: auto 0;
    border-bottom: 4px solid ${Colors.accent};
    border-right: 4px solid ${Colors.accent};
    width: 11px;
    height: 22px;
    border-radius: 5px;
    transform: rotate(45deg) scale(0);
    transition: transform 150ms ease-in-out;
  }
  label.checked::after {
    transform: rotate(45deg) scale(1);
  }
  label::before {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 30px;
    height: 30px;
    z-index: 0;
    border: rgba(255, 255, 255, 0.4) 5px solid;
    border-radius: 5px;
    background: #fff;
    background-clip: padding-box;
    transition: border-color 0.3s ease-in-out;
  }
  &:hover label::before {
    border-color: rgba(255, 255, 255, 0.7);
  }
  &:hover label::before,
  &:hover label::before {
    outline: none;
    border-color: #fff;
  }
`

// User input includes: email, fullname, and two wallet's number
@injectIntl
@withRouter
@inject('userStore')
@inject('cashStore')
@observer
class UserData extends Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired,
    // mobx
    walletIncome: PropTypes.number.isRequired,
    walletOutgo: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.inputs = []
  }

  state = {
    username: null, //null - is not chekced, false - no error, true - have some errors
    email: null,
    income: null,
    outgo: null,
    loading: false,
    agree: false,
  }

  _handleCheckboxChange = () => this.setState(({agree}) => ({agree: !agree}))

  /**
  * Check inputs for errors. Inputs are getting by ref 
  * Wating for resolve array of promises
  *   Everythings is ok create an oreder
  *   Otherwise nothing
  * @public
  */
  handleSubmit = async () => {
    this.setState({loading: true})
    // fix double click for premade input's values
    // or
    // await this.inputs.map(async input => await input.handleChange())
    await Promise.all(this.inputs.map(input => input.handleChange()))
    const {agree, loading, ...state} = this.state
    if (isAllPropsFalse(state)) {
      this.props.cashStore
        .createPayment({
          email: this.props.userStore.email,
          token: this.props.userStore.token,
          fromWallet: this.props.userStore.wallets[this.props.walletIncome],
          toWallet: this.props.userStore.wallets[this.props.walletOutgo],
        })
        .then(() => {
          this.props.userStore
            .updateInfo()
            .then(data => {
              console.log('userStore done', data)
            })
            .catch(err => console.error(err))
          if (!this.props.cashStore.isNetworkError)
            this.props.history.push('/podtverjdenie-oplati')
          this.setState({loading: false})
        })
        .catch(err => console.error('createpayment erorr', err))
    } else {
      this.setState({loading: false})
      console.log('invalid')
    }
  }

  render() {
    const {
      username,
      changeUsername,
      changeEmail,
      email,
      wallets,
      changeWallet,
    } = this.props.userStore
    const {currency, currencyInput, currencyOutput} = this.props.cashStore
    const {formatMessage} = this.props.intl
    return (
      <StyledUserData>
        <Input
          ref={child => (this.inputs[0] = child)}
          value={username}
          handleChange={changeUsername}
          placeholder={formatMessage({
            id: 'home.userDataPlaceholder.username',
            defaultMessage: 'ФИО',
          })}
          pattern="[a-zа-яё]{2,}"
          errorMsg={formatMessage({
            id: 'home.userDataError.username',
            defaultMessage: 'Введите ваше ФИО',
          })}
          isInvalid={this.state.username}
          handleErrorChange={(username, res) => this.setState({username}, res())}
        />
        <Input
          ref={child => (this.inputs[1] = child)}
          value={email}
          handleChange={changeEmail}
          placeholder={formatMessage({
            id: 'home.userDataPlaceholder.email',
            defaultMessage: 'Почта',
          })}
          pattern={`^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`}
          errorMsg={formatMessage({
            id: 'home.userDataError.email',
            defaultMessage: 'Введите ваш Email',
          })}
          isInvalid={this.state.email}
          handleErrorChange={(email, res) => this.setState({email}, res())}
        />
        <Input
          ref={child => (this.inputs[2] = child)}
          value={wallets[this.props.walletIncome]}
          handleChange={val => changeWallet(this.props.walletIncome)(val)}
          mask={currency.length && currency[currencyInput].label}
          placeholder={formatMessage(
            {
              id: 'home.userDataPlaceholder.fromWallet',
              defaultMessage: 'Ваш {wallet} кошелек',
            },
            {
              wallet:
                currency[currencyInput] && currency[currencyInput].name.toLowerCase(),
            },
          )}
          errorMsg={formatMessage({
            id: 'home.userDataError.userInputWallet',
            defaultMessage: 'Введите номер кошелька с которого вы будете переводить',
          })}
          isInvalid={this.state.income}
          handleErrorChange={(income, res) => this.setState({income}, res())}
          handleEnterPress={this.handleSubmit}
        />
        <Input
          ref={child => (this.inputs[3] = child)}
          value={wallets[this.props.walletOutgo]}
          handleChange={val => changeWallet(this.props.walletOutgo)(val)}
          mask={currency.length && currency[currencyOutput].label}
          placeholder={formatMessage(
            {
              id: 'home.userDataPlaceholder.toWallet',
              defaultMessage: 'Ваш номер для {wallet}',
            },
            {
              wallet:
                currency[currencyOutput] && currency[currencyOutput].name.toLowerCase(),
            },
          )}
          errorMsg={formatMessage({
            id: 'home.userDataError.userOutputWallet',
            defaultMessage: 'Введите номер вашего кошелька для получения',
          })}
          isInvalid={this.state.outgo}
          handleErrorChange={(outgo, res) => this.setState({outgo}, res())}
          handleEnterPress={this.handleSubmit}
        />
        <CheckboxWrap>
          <label
            className={this.state.agree ? 'checked' : ''}
            htmlFor="agree"
            onClick={this._handleCheckboxChange}
          >
            <input
              id="agree"
              type="checkbox"
              onChange={this._handleCheckboxChange}
              checked={this.state.agree}
            />
            <FormattedMessage
              id="home.acceptForTransfer"
              defaultMessage="Я согласен на обработку личных данных"
            />
          </label>
        </CheckboxWrap>
        <ButtonWrap>
          <Button
            disabled={!this.state.agree}
            caption={formatMessage({
              id: 'home.userData.create',
              defaultMessage: 'Создать',
            })}
            toggle={this.handleSubmit}
            loading={this.state.loading}
          />
        </ButtonWrap>
      </StyledUserData>
    )
  }
}

export default UserData
