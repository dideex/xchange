import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import styled from 'react-emotion'
import {withRouter} from 'react-router-dom'
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
    }
  }
`

const ButtonWrap = styled('div')`
  & {
    flex: 100% 0 0;
    text-align: center;
    button {
      width: 37%;
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

//TODO: checkbox
// UserData component;
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

  hanldeSubmit = async () => {
    this.setState({loading: true})
    // fix double click for premade input's values
    // or
    // await this.inputs.map(async input => await input.handleChange())
    await Promise.all(this.inputs.map(input => input.handleChange()))
    const {agree, loading, ...state} = this.state
    if (isAllPropsFalse(state)) {
      this.props.cashStore
        .createPayment({
          token: this.props.userStore.token,
          fromWallet: this.props.userStore.wallets[this.props.walletIncome],
          toWallet: this.props.userStore.wallets[this.props.walletOutgo],
        })
        .then(() => {
          this.props.userStore
            .updateInfo()
            .then(() => {
              console.log('userStore done')
            })
            .catch(err => console.error(err))
          this.props.history.push('/podtverjdenie-oplati')
          this.setState({loadng: false})
        })
        .catch(err => console.error('createpayment erorr', err))
    } else console.log('invalid')
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
    return (
      <StyledUserData>
        <Input
          ref={child => (this.inputs[0] = child)}
          value={username}
          handleChange={changeUsername}
          placeholder="username"
          pattern="[a-zа-яё]{2,}"
          errorMsg="Введите ваше ФИО"
          isInvalid={this.state.username}
          handleErrorChange={(username, res) => this.setState({username}, res())}
        />
        <Input
          ref={child => (this.inputs[1] = child)}
          value={email}
          handleChange={changeEmail}
          placeholder="email"
          pattern={`^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`}
          errorMsg="Введите ваш Email"
          isInvalid={this.state.email}
          handleErrorChange={(email, res) => this.setState({email}, res())}
        />
        <Input
          ref={child => (this.inputs[2] = child)}
          value={wallets[this.props.walletIncome]}
          handleChange={val => changeWallet(this.props.walletIncome)(val)}
          mask="____ ____ ____ ____"
          pattern="^\d+$"
          placeholder="income"
          errorMsg="Введите ваш Income"
          isInvalid={this.state.income}
          handleErrorChange={(income, res) => this.setState({income}, res())}
        />
        <Input
          ref={child => (this.inputs[3] = child)}
          value={wallets[this.props.walletOutgo]}
          handleChange={val => changeWallet(this.props.walletOutgo)(val)}
          mask="____ ____ ____ ____"
          pattern="^\d+$"
          placeholder="outgo"
          errorMsg="Введите ваш Outgo"
          isInvalid={this.state.outgo}
          handleErrorChange={(outgo, res) => this.setState({outgo}, res())}
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
            Я согласен на обработку личных данных
          </label>
        </CheckboxWrap>
        <ButtonWrap>
          <Button
            disabled={!this.state.agree}
            caption="Создать"
            toggle={this.hanldeSubmit}
            loading={this.state.loading}
          />
        </ButtonWrap>
      </StyledUserData>
    )
  }
}

export default UserData
