import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {DropTarget} from 'react-dnd'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import Svg from '../common/CurrencyIcons'
import Colors from '../../config/Colors'
import Input from './controls/CurrencyInput'
import Select from './controls/CurrencySelect'
import {SvgCurrency} from '../common/Styles'

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
    top: .8em;
    left: 15px;
  }
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
    const {inputValue, changeInput, onSelectChange, currencyId} = this.props
    const {currency} = this.props.cashStore

    const {canDrop, isOver, connectDropTarget} = this.props
    const isActive = canDrop && isOver
    let backgroundColor = Colors.accent
    if (isActive) {
      backgroundColor = Colors.subAccent
    } else if (canDrop) {
      backgroundColor = Colors.darkAccent
    }
    return (
      connectDropTarget &&
      connectDropTarget(
        <div>
          <FieldStyled style={{backgroundColor}}>
            <BadgeIcon>
              <Svg style={SvgCurrency} id={currency[currencyId].name} />
            </BadgeIcon>
            <Input value={inputValue} handleChange={changeInput} />
            <Select id={currencyId} currency={currency} handleChange={onSelectChange} />
          </FieldStyled>
        </div>,
      )
    )
  }
}

export default InputField
