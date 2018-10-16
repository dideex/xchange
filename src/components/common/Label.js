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
  }

  render() {
    return <StyledLabel onClick={this.props.onClick}>⚛{this.props.caption}</StyledLabel>
  }
}

export default Label
