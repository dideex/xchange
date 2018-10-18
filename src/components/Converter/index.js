import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import CustomerDragLayer from './CustomerDragLayer'
import Field from './InputField'
import UserData from './UserData'
import CurrencyDNDArea from './CurrencyDNDArea'

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
      <main>
        <DragDropContextProvider backend={HTML5Backend}>
          <div style={{display: 'flex'}}>
            <Field
              inputValue={inputValue}
              changeInput={changeInput}
              onSelectChange={setCurrencyInput}
              currencyId={currencyInput}
            />
            <Field
              inputValue={outputValue}
              changeInput={changeOutput}
              onSelectChange={setCurrencyOutput}
              currencyId={currencyOutput}
            />
          </div>
          <CustomerDragLayer />
          <CurrencyDNDArea currency={currency} />
        </DragDropContextProvider>
        <UserData walletIncome={currencyInput} walletOutgo={currencyOutput} />
      </main>
    )
  }
}
