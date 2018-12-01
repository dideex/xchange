import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import Colors from './Colors';

const StyledButton = styled('button')`
& {
  cursor: pointer;
  display: inline-block;
  color: #fff;
  border: rgba(174, 226, 57, 0.4) 5px solid;
  border-radius: 5px;
  padding: 8px 80px;
  background: ${Colors.darkAccent};
  background-clip: padding-box;
  transition: border-color 0.3s ease-in-out;
}
&:hover {
  border-color: rgba(174, 226, 57, 0.8);
}
&:focus,
&:active {
  outline: none;
  border-color: ${Colors.accent};
}
`
// Button with accent color
export class AccentButton extends Component {
  static propTypes = {
    toggle: PropTypes.func.isRequired,
  }

  render() {
    const {children, toggle} = this.props
    return <StyledButton onClick={toggle}>{children}</StyledButton>
  }
}

export default AccentButton
