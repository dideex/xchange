import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import Svg from './CurrencyIcons'
import {SvgCurrency} from './Styles'

const StyledLabel = styled('span')`
  & {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`

// Label component;
export class Label extends Component {
  static propTypes = {
    caption: PropTypes.string.isRequired,
  }

  render() {
    const {caption, style, onClick} = this.props
    return (
      <StyledLabel style={{...style}} onClick={onClick}>
        <Svg style={SvgCurrency} id={caption} />
        <span>{caption}</span>
      </StyledLabel>
    )
  }
}

export default Label
