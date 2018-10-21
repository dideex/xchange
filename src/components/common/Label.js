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
    padding: 10px 5px;
    transition: all 0.2s ease-in-out;
    span {
      font-family: 'Roboto Slab';
      padding-left: 15px;
      font-size: 20px;
    }
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
        <Svg style={{...SvgCurrency, zIndex: 1}} id={caption} />
        <span>{caption}</span>
      </StyledLabel>
    )
  }
}

export default Label
