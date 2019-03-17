import React, {Component} from 'react'
import styled from 'react-emotion'
import {inject, observer} from 'mobx-react'
import {FormattedMessage, injectIntl} from 'react-intl'

import {H2, Input, Button, isAllPropsFalse} from '../common'

export const Wrap = styled('div')`
  & {
    padding: 0 60px;
    @media (max-width: 1024px) {
      padding: 0 30px;
    }
    @media (max-width: 767px) {
      padding: 0 15px;
    }
    button,
    label {
      display: block;
      width: 37%;
      margin: 0 auto 50px;
      @media (max-width: 1024px) {
        width: 100%;
      }
    }
  }
`

// Signin component
@inject('userStore')
@injectIntl
@observer
class SignIn extends Component {
  constructor(props) {
    super(props)
    this.inputs = []
    this.wrap = React.createRef()
  }

  state = {
    usernameError: null,
    passwordError: null,
  }

  componentDidMount() {
    this.props.userStore.clearErr()
    window.scrollTo(
      0,
      this.wrap.current.getBoundingClientRect().top + window.pageYOffset - 150,
    )
  }

  componentWillUnmount() {
    this.props.userStore.changePassword('')
  }

  handleSubmit = async () => {
    console.log('fire')
    const {usernameError, passwordError} = this.state
    // fix double click for premade input's values
    // or
    await this.inputs.map(async input => await input.handleChange())
    // await Promise.all(this.inputs.map(input => input.handleChange()))
    if (isAllPropsFalse({usernameError, passwordError})) {
      this.props.userStore.getToken()
    } else {
      console.log('invalid')
    }
  }

  render() {
    const {login, password, changeLogin, changePassword} = this.props.userStore
    const {formatMessage} = this.props.intl
    return (
      <Wrap>
        <div ref={this.wrap}>
          <H2><FormattedMessage id="cp.signin.header" defaultMessage="Войти в личный кабинет" /></H2>
        </div>
        <Input
          ref={child => (this.inputs[0] = child)}
          value={login}
          handleChange={changeLogin}
          placeholder={formatMessage({
            id: 'home.cpPlaceholder.login',
            defaultMessage: 'Логин',
          })}
          pattern="[a-zа-яё]{2,}"
          errorMsg={formatMessage({
            id: 'home.cpError.login',
            defaultMessage: 'Введите ваш логин',
          })}
          isInvalid={this.state.usernameError}
          handleErrorChange={(usernameError, res) =>
            this.setState({usernameError}, res())
          }
          handleEnterPress={this.handleSubmit}
        />
        <Input
          ref={child => (this.inputs[1] = child)}
          value={password}
          handleChange={changePassword}
          type="password"
          pattern="\S{6,}"
          placeholder={formatMessage({
            id: 'home.cpPlaceholder.username',
            defaultMessage: 'Пароль',
          })}
          errorMsg={formatMessage({
            id: 'home.cpError.password',
            defaultMessage: 'Введите ваш пароль',
          })}
          isInvalid={this.state.passwordError}
          handleErrorChange={(passwordError, res) =>
            this.setState({passwordError}, res())
          }
          handleEnterPress={this.handleSubmit}
        />
        <Button
          toggle={this.handleSubmit}
          caption={formatMessage({
            id: 'home.cp.enter',
            defaultMessage: 'Войти',
          })}
        />
      </Wrap>
    )
  }
}

export default SignIn
