import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {DropTarget} from 'react-dnd'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {CurrencyIcons, Colors, SvgCurrency, currencyFormat} from '../common'
import Select from './controls/CurrencySelect'
import Input from './controls/CurrencyInput'

import './css/inputStyles.css'

const FieldStyled = styled('div')`
  & {
    position: relative;
    border-radius: 5px;
    padding: 5px 5px;
  }
`

const BadgeIcon = styled('span')`
  & {
    position: absolute;
    top: 18px;
    left: 20px;
    z-index: 1;
    @media (max-width: 1024px) {
      top: 16px;
    }
  }
`

const CurrencyLabel = styled('span')`
  position: absolute;
  top: 20px;
  right: 66px;
`

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(connect, monitor),
})

const spec = {
  drop: (props, monitor) => {
    props.onSelectChange(monitor.getItem().id)
    return {name: monitor.getItem()}
  },
}

// Field for currencies input
@DropTarget('cash', spec, collect)
@inject('cashStore')
@observer
class InputField extends Component {
  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    currencyId: PropTypes.number.isRequired,
    changeInput: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
  }

  // Is open dropdown with currencies
  state = {
    open: false,
  }

  render() {
    const {inputValue, changeInput, onSelectChange, currencyId} = this.props
    const {currency, correctValuesLimits} = this.props.cashStore

    const {canDrop, isOver, connectDropTarget} = this.props
    const isActive = canDrop && isOver

    let backgroundColor = Colors.accent
    // Hightlight background when currency-badge is dragging and under this component
    if (isActive) {
      backgroundColor = Colors.subAccent
    } else if (canDrop) {
      backgroundColor = Colors.darkAccent
    }
    return (
      connectDropTarget &&
      connectDropTarget(
        <div onMouseLeave={() => this.setState({open: false})}>
          <FieldStyled style={{backgroundColor}}>
            <BadgeIcon>
              <CurrencyIcons
                style={SvgCurrency}
                id={currency.length && currency[currencyId].icon}
              />
            </BadgeIcon>
            <Input
              onBlur={correctValuesLimits}
              value={currencyFormat(inputValue)}
              handleChange={changeInput}
            />
            <Select
              isOpen={this.state.open}
              toggleField={e => this.setState({open: e})}
              id={currencyId}
              currency={currency}
              handleChange={onSelectChange}
            />
            <CurrencyLabel>{currency.length && currency[currencyId].label}</CurrencyLabel>
          </FieldStyled>
        </div>,
      )
    )
  }
}

export default InputField
