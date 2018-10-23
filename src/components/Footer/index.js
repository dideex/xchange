import React, {Component} from 'react'
import styled from 'react-emotion'

import {Icons, Input, Colors, H2, Button, container} from '../common'

const FooterWrap = styled('footer')`
  & {
    margin-top: 150px;
    padding-bottom: 200px;
    position: relative;
    background-image: linear-gradient(white 0, white);
  }
  & svg {
    position: absolute;
    top: 150px;
    left: 0;
    right: 0;
  }
  & label,
  & textarea {
    margin-bottom: 50px;
  }
  & button {
    width: 37%;
    display: block;
    margin: 0 auto;
  }
`
const Textarea = styled('textarea')`
  & {
    width: 100%;
    position: relative;
    z-index: 0;
    border: rgba(255, 255, 255, 0.4) 5px solid;
    border-radius: 5px;
    padding: 8px 15px;
    background: #fff;
    background-clip: padding-box;
    transition: border-color 0.3s ease-in-out;
    resize: none;
    min-height: 180px;
  }
  &:hover {
    border-color: rgba(255, 255, 255, 0.7);
  }
  &:focus,
  &:active {
    outline: none;
    border-color: '#fff';
  }
`

const Form = styled('section')`
  position: relative;
  z-index: 2;
  width: 60%;
  margin: 0 auto;
  padding: 20px 80px 50px;
  background: ${Colors.accent};
  border-radius: 10px;
`

const Copy = styled('div')`
  & {
    ${container}
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    color: #fff;
  }
  & strong, & a {
    font-size: 24px;
  }
`

// Footer component;
class Footer extends Component {
  state = {
    email: '',
    emailError: null,
    phone: '',
    phoneError: null,
    message: '',
    validate: false,
  }

  componentDidUpdate(_, {validate}) {
    if (validate && !this.state.validate) this._validate()
  }

  _handleSubmit = () => {
    const {emailError, phoneError} = this.state
    if (~[emailError, phoneError].indexOf(null))
      this.setState({validate: true}, () => this._validate(this.props.history))
    else this._validate(this.props.history)
  }

  _validate = () => {
    const {emailError, phoneError} = this.state
    if (this.state.validate) return null
    if (!emailError && !phoneError) console.log('SEND EMAIL !!!11')
    else console.log('invalid')
  }

  // FIXME: Rework static size of background's svg
  render() {
    return (
      <FooterWrap>
        <Form>
          <H2>Остались вопросы?</H2>
          <Input
            value={this.state.email}
            placeholder="email"
            pattern={`^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`}
            errorMsg="Введите ваш Email"
            handleChange={email => this.setState({email})}
            isInvalid={this.state.emailError}
            handleErrorChange={emailError => this.setState({emailError, validate: false})}
            validate={this.state.validate}
          />
          <Input
            value={this.state.phone}
            placeholder="phone"
            pattern="^\d+$"
            mask='+_(___)-___-__-__'
            errorMsg="Введите ваш телефон"
            handleChange={phone => this.setState({phone})}
            isInvalid={this.state.phoneError}
            handleErrorChange={phoneError => this.setState({phoneError, validate: false})}
            validate={this.state.validate}
          />
          <Textarea
            value={this.state.message}
            onChange={({target}) => this.setState({message: target.value})}
          />
          <Button caption="Отправить" toggle={this._handleSubmit} />
        </Form>
        <Icons id="afterFooterBg" style={{width: '100%'}} />
        <Copy>
          <strong>XChange &copy; 2009 - 2018</strong>
          <a href="vk.com" target="_blank">Created by vk.com</a>
        </Copy>
      </FooterWrap>
    )
  }
}

export default Footer
