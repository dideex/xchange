import React, {Component, Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import CurrencyBadge from './CurrencyBadge'
import Field from './InputField'

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
      setCurrencyInput,
      setCurrencyOutput,
    } = this.props.cashStore
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Field
          inputValue={inputValue}
          changeInput={changeInput}
          onSelectChange={setCurrencyInput}
          currencyId={currencyInput}
          disableCurrencyId={currencyOutput}
        />
        <Field
          inputValue={outputValue}
          changeInput={changeOutput}
          onSelectChange={setCurrencyOutput}
          currencyId={currencyOutput}
          disableCurrencyId={currencyInput}
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
