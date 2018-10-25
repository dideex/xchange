import React, {Component} from 'react'
import styled from 'react-emotion'

import {H2, Input, Button} from '../common'

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

// Signup component;
class Signup extends Component {
  constructor(props) {
    super(props)
    this.inputs = []
  }

  state = {
    username: '',
    usernameError: null,
    password: '',
    passwordError: null,
    email: '',
    emailError: null,
  }

  _handleSubmit = async () => {
    const {usernameError, passwordError} = this.state
    // inputs have touched
    if (~[usernameError, passwordError].indexOf(null)) {
      // call validate function from child directly
      // await for promise has resolve
      await Promise.all(this.inputs.map(input => input.handleChange()))
      this._validate()
    } else this._validate()
  }

  _validate = () => {
    const {usernameError, passwordError} = this.state
    // when some input has error throw exception
    if (!usernameError && !passwordError) {
      console.log('REGISTER!!!')
    } else console.log('invalid')
  }

  render() {
    return (
      <Wrap>
        <H2>Регистрация</H2>
        <Input
          ref={child => (this.inputs[0] = child)}
          value={this.state.username}
          handleChange={e => this.setState({username: e})}
          placeholder="login"
          pattern="[a-zа-яё]{2,}"
          errorMsg="Введите ваш логин"
          isInvalid={this.state.usernameError}
          handleErrorChange={(usernameError, res) =>
            this.setState({usernameError}, res())
          }
        />
        <Input
          ref={child => (this.inputs[1] = child)}
          value={this.state.email}
          handleChange={e => this.setState({email: e})}
          placeholder="email"
          pattern={`^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`}
          errorMsg="Введите ваш email"
          isInvalid={this.state.emailError}
          handleErrorChange={(emailError, res) => this.setState({emailError}, res())}
        />
        <Input
          ref={child => (this.inputs[2] = child)}
          value={this.state.password}
          handleChange={e => this.setState({password: e})}
          type="password"
          pattern="\S{6,}"
          placeholder="password"
          errorMsg="Введите ваш пароль"
          isInvalid={this.state.passwordError}
          handleErrorChange={(passwordError, res) =>
            this.setState({passwordError}, res())
          }
        />
        <Button toggle={this._handleSubmit} caption="Регистрация" />
      </Wrap>
    )
  }
}

export default Signup
