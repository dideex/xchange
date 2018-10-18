import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

const StyledInput = styled('input')`
  & {
    border: rgba(255, 255, 255, 0.4) 5px solid;
    border-radius: 5px;
    padding: 8px 15px;
    background: #fff;
    background-clip: padding-box;
    transition: border-color 0.3s ease-in-out;
  }
  &:hover {
    border-color: rgba(255, 255, 255, 0.7);
  }
  &:focus,
  &:active {
    outline: none;
    border-color: #fff;
  }
`

// Input component;
class Input extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  }

  render() {
    const {value, handleChange, placeholder, style = {}} = this.props
    return (
      <StyledInput
        style={style}
        value={value}
        onChange={({target}) => handleChange(target.value)}
        placeholder={placeholder}
      />
    )
  }
}

export default Input
