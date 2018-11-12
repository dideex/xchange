import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'

import {H2, Input, Button, isAllPropsFalse} from '../common'
import {Wrap} from './Signin';


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
    this.props.userStore.clearErr()
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

  handleSubmit = async () => {
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
          handleEnterPress={this.handleSubmit}
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
          handleEnterPress={this.handleSubmit}
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
          handleEnterPress={this.handleSubmit}
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
          handleEnterPress={this.handleSubmit}
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
          handleEnterPress={this.handleSubmit}
        />
        <Button toggle={this.handleSubmit} caption="Регистрация" />
      </Wrap>
    )
  }
}

export default Signup
