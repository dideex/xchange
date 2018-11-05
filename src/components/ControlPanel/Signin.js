import React, {Component} from 'react'
import styled from 'react-emotion'
import {inject, observer} from 'mobx-react'

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

// FIXME: remove password from mobx after login
// ContorlPanel component;
@inject('userStore')
@observer
class ContorlPanel extends Component {
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

  handleSubmit = async () => {
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
    const {
      login,
      password,
      changeLogin,
      changePassword,
      errorMessage,
    } = this.props.userStore
    return (
      <Wrap>
        <div ref={this.wrap}>
          <H2>Войти в личный кабинет</H2>
        </div>
        <Input
          ref={child => (this.inputs[0] = child)}
          value={login}
          handleChange={changeLogin}
          placeholder="login"
          pattern="[a-zа-яё]{2,}"
          errorMsg="Введите ваш логин"
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
          placeholder="password"
          errorMsg="Введите ваш пароль"
          isInvalid={this.state.passwordError}
          handleErrorChange={(passwordError, res) =>
            this.setState({passwordError}, res())
          }
          handleEnterPress={this.handleSubmit}
        />
        {errorMessage && <ErrorField className="error-field">{errorMessage}</ErrorField>}
        <Button toggle={this.handleSubmit} caption="Войти" />
      </Wrap>
    )
  }
}

export default ContorlPanel
