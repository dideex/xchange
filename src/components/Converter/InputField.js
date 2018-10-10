import React, {Component, Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import {DropTarget} from 'react-dnd'
import PropTypes from 'prop-types'

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
    inputValue: PropTypes.string.isRequired,
    currencyId: PropTypes.string.isRequired,
    changeInput: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
  }

  render() {
    const {inputValue, changeInput, cashStore, onSelectChange, currencyId} = this.props
    const {currency, currencyOutput} = cashStore

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
        <input
          type="text"
          ref={input => (this.input = input)}
          onChange={() => changeInput(this.input.value)}
          value={inputValue}
          style={{backgroundColor}}
        />
        <select
          defaultValue={currencyId}
          name="currencyId"
          ref={currencyId => (this.currencyId = currencyId)}
          onChange={() => onSelectChange(this.currencyId.value)}
        >
          {currency.map(
            ({name}, i) =>
              i !== +currencyOutput ? (
                <option value={i} key={i}>
                  {name}
                </option>
              ) : null,
          )}
        </select>
      </Fragment>
    )
  }
}

export default InputField
