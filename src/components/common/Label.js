import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import Svg from './CurrencyIcons'
import {SvgCurrency} from './Styles'
import Colors from './Colors'

const StyledLabel = styled('span')`
  & {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px 15px;
    transition: all 0.2s ease-in-out;
    span {
      font-family: 'Roboto Slab';
      font-size: 20px;
      transition: padding-left 0.3s ease-in-out;
    }
    svg {
      transition: opacity 0.3s ease-in-out;
    }
    .currency_coin {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 8px;
      margin: auto 0;
    }
    .currency_bg {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto 0;
      width: 48px;
      height: 48px;
    }
  }
`

const IconWrap = ({style}) => (
  <svg style={style} className="currency_bg" x="0px" y="0px" viewBox="0 0 600 600">
    <path
      style={{fill: Colors.accent}}
      d="M600,300c0,5.8-0.2,11.5-0.5,17.2c-0.4,7.6-1.1,15.2-2.1,22.6c-5.5,41.1-19.2,79.6-39.6,113.7
c-49.6,83.2-138.3,140.3-240.8,146c-5.6,0.3-11.3,0.5-17,0.5C134.3,600,0,465.7,0,300S134.3,0,300,0S600,134.3,600,300z"
    />
    <path
      style={{fill: Colors.darkAccent}}
      d="M443,160.7c-36.2-36.9-86.6-59.8-142.4-59.8c-110.2,0-199.5,89.3-199.5,199.5c0,54.4,21.8,103.8,57.2,139.8l0,0
l0.6,0.6c0.4,0.4,0.9,0.9,1.3,1.3l157,157.4c102.5-5.7,191.2-62.8,240.8-146c20.3-34.1,34.1-72.5,39.6-113.7c1-7.4,1.7-15,2.1-22.6
L443,160.7z"
    />
  </svg>
)

// Label component;
export class Label extends Component {
  static propTypes = {
    caption: PropTypes.string.isRequired,
    icon: PropTypes.string,
  }

  render() {
    const {caption, style, onClick, big = false, isDragging = false, icon} = this.props

    const background = isDragging ? Colors.accent : 'transparent'
    const color = isDragging ? '#fff' : Colors.black
    const opacity = isDragging ? 0 : 1
    return (
      <StyledLabel style={{...style, color, background}} onClick={onClick}>
        {big && <IconWrap style={{opacity}} />}
        <Svg
          className="currency_coin"
          style={{...SvgCurrency, zIndex: 1, opacity}}
          id={icon}
        />
        <span style={{paddingLeft: isDragging ? 0 : 45}}>{caption}</span>
      </StyledLabel>
    )
  }
}

export default Label
