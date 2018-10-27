import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import styled from 'react-emotion'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Input, Button, isAllPropsFalse} from '../common'

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
  }

  _handleSubmit = async () => {
    // fix double click for premade input's values
    // or
    // await this.inputs.map(async input => await input.handleChange())
    await Promise.all(this.inputs.map(input => input.handleChange()))
    if (isAllPropsFalse(this.state)) {
      this.props.cashStore.createPayment()
      this.props.userStore.updateInfo()
      this.props.history.push('/podtverjdenie-oplati')
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
        <ButtonWrap>
          <Button caption="Send" toggle={this._handleSubmit} />
        </ButtonWrap>
      </StyledUserData>
    )
  }
}

export default UserData
