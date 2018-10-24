import React, {Component} from 'react'
import styled from 'react-emotion'
import {CSSTransition} from 'react-transition-group'
import PropTypes from 'prop-types'

import Colors from './Colors'

const StyledInput = styled('input')`
  & {
    width: 100%;
    position: relative;
    z-index: 0;
    border: ${({borderColor}) => borderColor} 5px solid;
    border-radius: 5px;
    padding: 8px 15px;
    background: #fff;
    background-clip: padding-box;
    transition: border-color 0.3s ease-in-out;
  }
  &:hover {
    border-color: ${({borderColorHover}) => borderColorHover};
  }
  &:focus,
  &:active {
    outline: none;
    border-color: ${({borderColorActive}) => borderColorActive};
  }
`
const InputWrap = styled('label')`
  position: relative;
  display: block;
  width: 100%;
`

const ErrorField = styled('span')`
  & {
    position: absolute;
    z-index: 2;
    top: calc(100% + 10px);
    left: 10px;
    line-height: 1;
    font-size: 14px;
    color: #fff;
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  }
  &.error--enter {
    opacity: 0.01;
    transform: translateY(-20px);
  }
  &.error--enter-active {
    opacity: 1;
    transform: translateY(0);
  }
  &.error--exit {
    opacity: 1;
    transform: translateY(0);
  }
  &.error--exit-active {
    opacity: 0.01;
    transform: translateY(-20px);
  }
`

// Input component;
export class Input extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.pattern = new RegExp(props.pattern ? props.pattern : '\\s|\\S', 'i')
    this.handleErrorChange = this.props.handleErrorChange || (() => {})
  }

  state = {
    touched: false,
  }

  _format = raw => {
    const {mask} = this.props
    const replsCount = (mask.match(/_/g) || []).length
    let formatted = mask
    const rawLen = raw.length
    for (let i = 0; i < replsCount; i++) {
      if (i >= rawLen) {
        formatted = formatted.substr(0, formatted.lastIndexOf(raw[rawLen - 1]) + 1)
        break
      }
      formatted = formatted.replace('_', raw[i])
    }
    return formatted
  }

  _clean = value => {
    const {mask} = this.props
    const maskChars = mask.replace('_', '').split('')
    let raw = value
    for (let i = 0; i < maskChars.length; i++) {
      raw = raw.replace(maskChars[i], '')
    }
    return raw
  }

  _validateWithMask = (value, res) => {
    let raw = this._clean(value)
    let formatted = this._format(raw)
    if (this.pattern.test(raw) || raw === '') {
      if (formatted.length !== this.props.mask.length) this.handleErrorChange(true, res)
      else this.handleErrorChange(false, res)
      return formatted
    }
    return null
  }

  handleChange = e =>
    new Promise(res => {
      let {value} = (e && e.target) || this.input.props
      if (this.props.mask) value = this._validateWithMask(value, res)
      else if (this.pattern.test(value)) this.handleErrorChange(false, res)
      else this.handleErrorChange(true, res)
      if (value !== null) this.props.handleChange(value)
    })

  render() {
    const {value, isInvalid = false, errorMsg, placeholder, style = {}} = this.props
    return (
      <InputWrap>
        <StyledInput
          ref={input => (this.input = input)}
          borderColor={isInvalid ? Colors.error : 'rgba(255,255,255,.4)'}
          borderColorHover={isInvalid ? Colors.errorHover : 'rgba(255,255,255,.7)'}
          borderColorActive={isInvalid ? Colors.errorHover : '#fff'}
          style={style}
          value={value}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
        <CSSTransition in={isInvalid} timeout={300} classNames="error-" unmountOnExit>
          <ErrorField>{errorMsg}</ErrorField>
        </CSSTransition>
      </InputWrap>
    )
  }
}

export default Input
