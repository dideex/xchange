import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import styled from 'react-emotion'

import {H2, Input, Button, isAllPropsFalse} from '../common'

const Wrap = styled('div')`
  & {
    padding: 0 60px;
    button,
    label {
      display: block;
      width: 37%;
      margin: 0 auto 50px;
    }
  }
`

const ErrorField = styled('p')`
  color: #f44336;
  font-weight: 700;
  text-align: center;
`

// Signup component;
@withRouter
@inject('userStore')
@observer
class Signup extends Component {
  constructor(props) {
    super(props)
    this.inputs = []
    this.wrap = React.createRef()
  }

  componentDidMount() {
    window.scrollTo(
      0,
      this.wrap.current.getBoundingClientRect().top + window.pageYOffset - 150,
    )
    this.props.userStore.token && this.props.history.push('/lichnii-kabinet')
  }

  componentWillUpdate({userStore, history}) {
    if (userStore.token) history.push('/lichnii-kabinet')
  }

  state = {
    loginError: null,
    usernameError: null,
    passwordError: null,
    emailError: null,
    passwordRepeated: '',
    passwordRepeatedError: null,
  }

  _handleSubmit = async () => {
    const {usernameError, passwordError, emailError} = this.state
    // fix double click for premade input's values
    // or
    // await this.inputs.map(async input => await input.handleChange())
    await Promise.all(this.inputs.map(input => input.handleChange()))
    if (
      isAllPropsFalse({usernameError, passwordError, emailError}) &&
      this.state.passwordRepeated === this.props.userStore.password
    ) {
      this.props.userStore.signupUser()
    } else {
      console.log('invalid')
    }
  }

  render() {
    const {
      username,
      login,
      password,
      email,
      changeLogin,
      changePassword,
      changeEmail,
      changeUsername,
      token,
      errorMessage,
    } = this.props.userStore

    return (
      <Wrap>
        <div ref={this.wrap}>
          <H2>Регистрация</H2>
        </div>
        <Input
          ref={child => (this.inputs[0] = child)}
          value={login}
          handleChange={changeLogin}
          placeholder="login"
          pattern="[a-zа-яё]{2,}"
          errorMsg="Введите ваш логин"
          isInvalid={this.state.loginError}
          handleErrorChange={(loginError, res) => this.setState({loginError}, res())}
        />
        <Input
          ref={child => (this.inputs[1] = child)}
          value={username}
          handleChange={changeUsername}
          placeholder="ФИО"
          errorMsg="Введите вашу ФИО"
          isInvalid={this.state.usernameError}
          handleErrorChange={(usernameError, res) =>
            this.setState({usernameError}, res())
          }
        />
        <Input
          ref={child => (this.inputs[2] = child)}
          value={email}
          handleChange={changeEmail}
          placeholder="email"
          pattern={`^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`}
          errorMsg="Введите ваш email"
          isInvalid={this.state.emailError}
          handleErrorChange={(emailError, res) => this.setState({emailError}, res())}
        />
        <Input
          ref={child => (this.inputs[3] = child)}
          value={password}
          handleChange={changePassword}
          type="password"
          pattern="\S{6,}"
          placeholder="password"
          errorMsg="Введите ваш пароль"
          isInvalid={this.state.passwordError}
          handleErrorChange={(passwordError, res) =>
            this.setState({passwordError}, res())
          }
        />
        <Input
          ref={child => (this.inputs[4] = child)}
          value={this.state.passwordRepeated}
          handleChange={e => this.setState({passwordRepeated: e})}
          type="password"
          pattern="\S{6,}"
          placeholder="password"
          errorMsg="Пароли не совпадают"
          isInvalid={this.state.passwordRepeated !== password}
          handleErrorChange={(passwordRepeatedError, res) =>
            this.setState({passwordRepeatedError}, res())
          }
        />
        {errorMessage && <ErrorField>{errorMessage}</ErrorField>}
        <Button toggle={this._handleSubmit} caption="Регистрация" />
      </Wrap>
    )
  }
}

export default Signup
