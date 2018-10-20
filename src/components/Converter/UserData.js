import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import styled from 'react-emotion'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Input, Button} from '../common'

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

// UserData component;
@withRouter
@inject('userStore')
@observer
class UserData extends Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired,
    // mobx
    walletIncome: PropTypes.number.isRequired,
    walletOutgo: PropTypes.number.isRequired,
  }

  state = {
    username: null,
    email: null,
    income: null,
    outgo: null,
    validate: false,
    loading: false,
  }

  componentDidUpdate(_, {loading}) {
    if (loading && !this.state.loading) this._validate()
  }

  _handleSubmit = () => {
    const {username, email, income, outgo} = this.state
    if (~[username, email, income, outgo].indexOf(null))
      this.setState({validate: true, loading: true}, () =>
        this._validate(this.props.history),
      )
    else this._validate(this.props.history)
  }

  _validate = () => {
    const {username, email, income, outgo} = this.state
    if (this.state.loading) return null
    if (!username && !email && !income && !outgo)
      this.props.history.push('/podtverjdenie-oplati')
    else console.log('invalid')
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
          value={username}
          handleChange={changeUsername}
          placeholder="username"
          pattern="[a-zа-яё]{2,}"
          errorMsg="Введите ваше ФИО"
          isInvalid={this.state.username}
          handleErrorChange={username => this.setState({username, loading: false})}
          validate={this.state.validate}
        />
        <Input
          value={email}
          handleChange={changeEmail}
          placeholder="email"
          pattern={`^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`}
          errorMsg="Введите ваш Email"
          isInvalid={this.state.email}
          handleErrorChange={email => this.setState({email, loading: false})}
          validate={this.state.validate}
        />
        <Input
          value={wallets[this.props.walletIncome]}
          handleChange={val => changeWallet(this.props.walletIncome)(val)}
          mask="____ ____ ____ ____"
          pattern="^\d+$"
          placeholder="income"
          errorMsg="Введите ваш Income"
          isInvalid={this.state.income}
          handleErrorChange={income => this.setState({income, loading: false})}
          validate={this.state.validate}
        />
        <Input
          value={wallets[this.props.walletOutgo]}
          handleChange={val => changeWallet(this.props.walletOutgo)(val)}
          mask="____ ____ ____ ____"
          pattern="^\d+$"
          placeholder="outgo"
          errorMsg="Введите ваш Outgo"
          isInvalid={this.state.outgo}
          handleErrorChange={outgo => this.setState({outgo, loading: false})}
          validate={this.state.validate}
        />
        <ButtonWrap>
          <Button
            caption="Send"
            toggle={this._handleSubmit}
            loading={this.state.loading}
          />
        </ButtonWrap>
      </StyledUserData>
    )
  }
}

export default UserData
