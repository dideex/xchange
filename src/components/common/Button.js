import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import Loading from './Loading'

const StyledButton = styled('button')`
  & {
    border: rgba(255, 255, 255, 0.4) 5px solid;
    border-radius: 5px;
    padding: 8px 15px;
    background: #fff;
    background-clip: padding-box;
    transition: border-color 0.3s ease-in-out;
    cursor: ${({cursor}) => cursor};
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
const Content = styled('div')`
  & {
    position: relative;
    div {
      position: absolute;
      top: 0;
      bottom: 0;
      left: calc(50% - 82px);
      margin: auto 0;
    }
  }
`

// Button component;
export class Button extends Component {
  static propTypes = {
    toggle: PropTypes.func.isRequired,
    caption: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
  }

  render() {
    const {caption, toggle, disabled = false, loading = false} = this.props
    return (
      <StyledButton
        cursor={disabled ? 'not-allowed' : 'pointer'}
        onClick={disabled ? () => {} : toggle}
      >
        <Content>
          {loading && <Loading size="inline" />}
          {caption}
        </Content>
      </StyledButton>
    )
  }
}

export default Button
