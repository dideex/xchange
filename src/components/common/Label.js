import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

const StyledLabel = styled('span')`
  & {
    flex: 33% 0 0;
    cursor: pointer;
  }
`

// Label component;
class Label extends Component {
  static propTypes = {
    caption: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }

  render() {
    return (
      <StyledLabel style={{...this.props.style}} onClick={this.props.onClick}>
        <i>{this.props.icon}</i>
        <span>{this.props.caption}</span>
      </StyledLabel>
    )
  }
}

export default Label
