import React, {Component, Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import CurrencyBadge from './CurrencyBadge'
import Field from './InputField'
import UserData from './UserData';

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
      <Fragment>
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
          <ul>
            {currency.map(({name, id}, i) => (
              <CurrencyBadge key={i} id={id} name={name} />
            ))}
          </ul>
        </DragDropContextProvider>
        <UserData walletIncome={currencyInput} walletOutgo={currencyOutput}/>
      </Fragment>
    )
  }
}
