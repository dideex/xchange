import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

const StyledButton = styled('button')`
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
// Button component;
class Button extends Component {
  static propTypes = {
    toggle: PropTypes.func.isRequired,
    caption: PropTypes.string.isRequired,
  }

  render() {
    const {caption, toggle} = this.props
    return <StyledButton onClick={toggle}>{caption}</StyledButton>
  }
}

export default Button
