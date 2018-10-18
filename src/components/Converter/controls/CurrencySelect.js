import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {Icons, Label, SvgCurrency} from '../../common'

const Wrapper = styled('div')`
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 14px;
  background-color: transparent;
`

const SelectBlock = styled('div')`
  & {
    z-index: 10;
    position: absolute;
    top: calc(100% + 10px);
    left: -200px;
    right: -15px;
    display: flex;
    flex-wrap: wrap;
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

// CurrencySelect component;
class CurrencySelect extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    currency: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
  }

  _handleSelect = id => {
    this.props.toggleField(true)
    this.props.handleChange(id)
  }

  _getSelectionField = () => (
    <SelectBlock>
      {this.props.currency.map(({name, id}, i) => (
        <Label
          key={i}
          onClick={this._handleSelect.bind(null, id)}
          caption={name}
          style={{flex: '50% 0 0'}}
        />
      ))}
    </SelectBlock>
  )

  render() {
    return (
      <Wrapper onMouseEnter={() => this.props.toggleField(true)}>
        <Icons id="chevron" style={SvgCurrency} />
        {this.props.isOpen && this._getSelectionField()}
      </Wrapper>
    )
  }
}

export default CurrencySelect
