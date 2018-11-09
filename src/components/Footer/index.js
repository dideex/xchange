import React, {Component} from 'react'
import styled from 'react-emotion'

import {Icons, Input, Colors, H2, Button, container, isAllPropsFalse} from '../common'
import Api from '../Api';

const FooterWrap = styled('footer')`
  & {
    margin-top: 150px;
    position: relative;
    background-image: linear-gradient(white 0, white);
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

const WithBackground = styled('div')`
  & {
    position: relative;
    margin-top: -100px;
    background: ${Colors.subAccent};
    svg {
      position: absolute;
      bottom: calc(100% - 1px);
      left: 0;
      right: 0;
    }
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
  span {
    display: block;
    text-align: center;
  }
`

const Copy = styled('div')`
  & {
    ${container} display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 350px 0 30px;
  }
  & strong,
  & a {
    font-size: 24px;
  }
`

const ErrorField = styled('p')`
  color: #f44336;
  font-weight: 700;
  text-align: center;
`

// Footer component;
class Footer extends Component {
  state = {
    email: '',
    emailError: null,
    phone: '',
    phoneError: null,
    message: '',
    loading: false,
    messageFromBack: '',
  }

  constructor(props) {
    super(props)
    this.inputs = []
  }

  handleSubmit = async () => {
    const {emailError, phoneError, email, phone, message} = this.state
    this.setState({loading: true, messageFromBack: ''})
    // fix double click for premade input's values
    // or
    // await this.inputs.map(async input => await input.handleChange())
    await Promise.all(this.inputs.map(input => input.handleChange()))
    if (isAllPropsFalse({emailError, phoneError})) {
      Api.post('sendMessage', {email, phone, message})
        .then(res => res.json())
        .then(({status}) => this.setState({loading: false, messageFromBack: status}))
        .catch(({status}) => this.setState({loading: false, messageFromBack: status}))
    } else {
      this.setState({loading: false})
      console.log('error')
    }
  }

  render() {
    return (
      <FooterWrap>
        <Form>
          <H2>Остались вопросы?</H2>
          <Input
            ref={child => (this.inputs[0] = child)}
            value={this.state.email}
            placeholder="email"
            pattern={`^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`}
            errorMsg="Введите ваш Email"
            handleChange={email => this.setState({email})}
            isInvalid={this.state.emailError}
            handleErrorChange={(emailError, res) => this.setState({emailError}, res())}
            handleEnterPress={this.handleSubmit}
          />
          <Input
            ref={child => (this.inputs[1] = child)}
            value={this.state.phone}
            placeholder="phone"
            pattern="^\d+$"
            mask="phone"
            errorMsg="Введите ваш телефон"
            handleChange={phone => this.setState({phone})}
            isInvalid={this.state.phoneError}
            handleErrorChange={(phoneError, res) => this.setState({phoneError}, res())}
            handleEnterPress={this.handleSubmit}
          />
          <Textarea
            value={this.state.message}
            onChange={({target}) => this.setState({message: target.value})}
          />
          <ErrorField>{this.state.messageFromBack}</ErrorField>
          <Button
            loading={this.state.loading}
            caption="Отправить"
            toggle={this.handleSubmit}
          />
        </Form>
        <WithBackground>
          <Icons id="afterFooterBg" style={{width: '100%'}} />
          <Copy>
            <strong>XChange &copy; 2009 - 2018</strong>
            <a href="vk.com" target="_blank">
              Created by vk.com
            </a>
          </Copy>
        </WithBackground>
      </FooterWrap>
    )
  }
}

export default Footer
