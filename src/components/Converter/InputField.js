import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {DropTarget} from 'react-dnd'
import PropTypes from 'prop-types'

import Input from './controls/CurrencyInput'
import Select from './controls/CurrencySelect'

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(connect, monitor),
})

const spec = {
  drop: (props, monitor) => {
    console.log(' LOG ___ monitor ', monitor.getItem())
    props.onSelectChange(monitor.getItem().id)
    return {name: monitor.getItem()}
  },
}

@DropTarget('cash', spec, collect)
@inject('cashStore')
@observer
class InputField extends Component {
  static propTypes = {
    inputValue: PropTypes.number.isRequired,
    currencyId: PropTypes.number.isRequired,
    changeInput: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      inputValue,
      changeInput,
      onSelectChange,
      currencyId,
    } = this.props
    const {currency} = this.props.cashStore

    const {canDrop, isOver, connectDropTarget} = this.props
    const isActive = canDrop && isOver
    let backgroundColor = 'yellowgreen'
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }
    return (
      connectDropTarget &&
      connectDropTarget(
        <div>
          <span>{currency[currencyId].label}</span>
          <Input
            value={inputValue}
            background={backgroundColor}
            handleChange={changeInput}
          />
          <Select
            id={currencyId}
            currency={currency}
            handleChange={onSelectChange}
          />
        </div>,
      )
    )
  }
}

export default InputField
