import React, {Component} from 'react'
import styled from 'react-emotion'
import {CSSTransition} from 'react-transition-group'

import {H2, Input, Icons, SvgCurrency} from '../common'
import {questions} from './mockQuestions.js'

const ReservedWrap = styled('div')`
  & {
    padding: 0 60px;
  }
  & .icon-safe {
    display: block;
    width: 30%;
    margin: 10px auto;
  }
`
const ContentWrap = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const InputWrap = styled('div')`
  & {
    position: relative;
    flex: 37% 0 0;
    margin-bottom: 50px;
  }
  & .currency-item svg {
    position: absolute;
    left: 11px;
    top: 11px;
    cursor: pointer;
    transform: rotate(${({rotate}) => rotate});
    transition: transform 0.3s ease-in-out;
  }
  & .currency-item input {
    padding-left: 43px;
    padding-right: 43px;
    cursor: pointer;
  }
`

const Answer = styled('div')`
  & {
    padding: 20px 0;
    transition: transform 0.3s ease-in-out;
  }
  &.content--enter {
    opacity: 0.01;
    transform: scale(0);
  }
  &.content--enter-active {
    opacity: 1;
    transform: scale(1);
  }
  &.content--exit {
    opacity: 1;
    transform: scale(1);
  }
  &.content--exit-active {
    opacity: 0.01;
    transform: scale(0);
  }
`

// FAQ component;
class FAQ extends Component {
  state = {
    active: false,
  }

  _handleClick = id => {
    this.setState({active: id})
  }

  render() {
    return (
      <ReservedWrap>
        <H2>FAQ</H2>
        <ContentWrap>
          {questions.map(({question, answer}, i) => (
            <InputWrap key={i} rotate={this.state.active === i ? '0deg' : '-90deg'}>
              <div onClick={() => this._handleClick(i)} className="currency-item">
                <Input value={question} handleChange={() => {}} />
                <Icons id="chevron" style={SvgCurrency} />
              </div>
              <CSSTransition
                in={this.state.active === i}
                timeout={300}
                classNames="content-"
                unmountOnExit
              >
                <Answer>{answer}</Answer>
              </CSSTransition>
            </InputWrap>
          ))}
        </ContentWrap>
      </ReservedWrap>
    )
  }
}

export default FAQ
