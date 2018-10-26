import React, {Component} from 'react'
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

// ContorlPanel component;
class ContorlPanel extends Component {
  constructor(props) {
    super(props)
    this.inputs = []
  }

  state = {
    username: '',
    usernameError: null,
    password: '',
    passwordError: null,
  }

  _handleSubmit = async () => {
    const {usernameError, passowrdError} = this.state
    // fix double click for premade input's values
    // or
    // await this.inputs.map(async input => await input.handleChange())
    await Promise.all(this.inputs.map(input => input.handleChange()))
    if (isAllPropsFalse({usernameError, passowrdError})) {
      console.log('Auth')
    } else console.log('invalid')
  }

  render() {
    return (
      <Wrap>
        <H2>Войти в личный кабинет</H2>
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
        <Button toggle={this._handleSubmit} caption="Войти" />
      </Wrap>
    )
  }
}

export default ContorlPanel