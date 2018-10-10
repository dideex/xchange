import React, {Component, Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import CurrencyBadge from './CurrencyBadge'
import Input from './InputField'

@inject('cashStore')
@observer
export default class Index extends Component {
  render() {
    const {
      inputValue,
      outputValue,
      changeInput,
      changeOutput,
      currency,
      currencyInput,
      currencyOutput,
      changeCurrencyInput,
      changeCurrencyOutput,
    } = this.props.cashStore
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Input
          inputValue={inputValue}
          changeInput={changeInput}
          onSelectChange={changeCurrencyInput}
          currencyId={currencyInput}
        />
        <Input
          inputValue={outputValue}
          changeInput={changeOutput}
          onSelectChange={changeCurrencyOutput}
          currencyId={currencyOutput}
        />
        <hr />
        <ul>
          {currency.map(({name}, i) => (
            <CurrencyBadge key={i} name={name} />
          ))}
        </ul>
      </DragDropContextProvider>
    )
  }
}
