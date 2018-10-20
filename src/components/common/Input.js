import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import Colors from './Colors'

const StyledInput = styled('input')`
  & {
    width: 100%;
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
  position: absolute;
  top: calc(100% + 10px);
  left: 10px;
  line-height: 1;
  font-size: 14px;
  color: #fff;
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
  }

  state = {
    error: false,
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

  _validateWithMask = value => {
    let raw = this._clean(value)
    let formatted = this._format(raw)
    if (this.pattern.test(raw) || raw === '') {
      if (formatted.length !== this.props.mask.length) this.setState({error: true})
      else this.setState({error: false})
      return formatted
    }
    return null
  }

  _handleChange = ({target}) => {
    let {value} = target
    if (this.props.mask) value = this._validateWithMask(value)
    else if (this.pattern.test(value)) this.setState({error: false})
    else this.setState({error: true})
    if (value !== null) this.props.handleChange(value)
  }

  render() {
    const {value, errorMsg, placeholder, style = {}} = this.props
    return (
      <InputWrap>
        <StyledInput
          borderColor={this.state.error ? Colors.error : 'rgba(255,255,255,.4)'}
          borderColorHover={this.state.error ? Colors.errorHover : 'rgba(255,255,255,.7)'}
          borderColorActive={this.state.error ? Colors.errorHover : '#fff'}
          style={style}
          value={value}
          onChange={this._handleChange}
          placeholder={placeholder}
        />
        {this.state.error && <ErrorField>{errorMsg}</ErrorField>}
      </InputWrap>
    )
  }
}

export default Input
