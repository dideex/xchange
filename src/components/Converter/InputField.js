import React, {Component, Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import {DropTarget} from 'react-dnd'
import PropTypes from 'prop-types'

import Input from './controls/CurrencyInput'
import Select from './controls/CurrencySelect'

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
})

const spec = {
  drop() {
    console.log('dropped')
    return {name: 'Dustbin'}
  },
}

@DropTarget('cash', spec, collect)
@inject('cashStore')
@observer
class InputField extends Component {
  static propTypes = {
    inputValue: PropTypes.number.isRequired,
    currencyId: PropTypes.number.isRequired,
    disableCurrencyId: PropTypes.number.isRequired,
    changeInput: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
  }

  render() {
    const {inputValue, changeInput, onSelectChange, currencyId, disableCurrencyId} = this.props
    const {currency, currencyOutput} = this.props.cashStore

    const {canDrop, isOver, connectDropTarget} = this.props
    const isActive = canDrop && isOver
    let backgroundColor = 'yellowgreen'
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }
    return (
      <Fragment>
        <span>{currency[currencyId].label}</span>
        <Input
          value={inputValue}
          background={backgroundColor}
          handleChange={changeInput}
        />
        <Select
          id={currencyId}
          currency={currency}
          output={disableCurrencyId}
          handleChange={onSelectChange}
        />
      </Fragment>
    )
  }
}

export default InputField
