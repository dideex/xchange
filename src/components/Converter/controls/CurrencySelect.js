import React, {Component} from 'react'
import styled from 'react-emotion'
import {CSSTransition} from 'react-transition-group'
import PropTypes from 'prop-types'

import {Icons, Label, SvgCurrency} from '../../common'

const Wrapper = styled('div')`
  position: absolute;
  right: 20px;
  top: 18px;
  background-color: transparent;
`

const SelectBlock = styled('div')`
  & {
    z-index: 10;
    position: absolute;
    top: calc(100% + 10px);
    min-width: 750px;
    display: flex;
    flex-wrap: wrap;
    border: rgba(255, 255, 255, 0.4) 5px solid;
    border-radius: 5px;
    padding: 8px 15px;
    background: #fff;
    background-clip: padding-box;
    box-shadow: 0px 5px 10px -4px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    border-color: rgba(255, 255, 255, 0.7);
  }
  &:focus,
  &:active {
    outline: none;
    border-color: #fff;
  }
  &.content--enter {
    opacity: 0.01;
    transform: scale(0.9) translateY(10px);
  }
  &.content--enter-active {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  &.content--exit {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  &.content--exit-active {
    opacity: 0.01;
    transform: scale(0.9) translateY(10px);
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
    <SelectBlock className={this.props.isOpen ? 'dropdown__content' : ''}>
      {this.props.currency.map(({name, id}, i) => (
        <Label
          key={i}
          onClick={this._handleSelect.bind(null, id)}
          caption={name}
          style={{flex: '33% 0 0'}}
        />
      ))}
    </SelectBlock>
  )

  render() {
    return (
      <Wrapper className="dropdown" onMouseEnter={() => this.props.toggleField(true)}>
        <Icons id="chevron" style={SvgCurrency} />
        <CSSTransition
          in={this.props.isOpen}
          timeout={300}
          classNames="content-"
          unmountOnExit
          onExit={() => console.log('exit')}
        >
          {this._getSelectionField()}
        </CSSTransition>
      </Wrapper>
    )
  }
}

export default CurrencySelect
