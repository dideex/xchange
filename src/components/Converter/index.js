import React, {Component, Fragment} from 'react'
import styled from 'react-emotion'
import {inject, observer} from 'mobx-react'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import CurrencyBadge from './CurrencyBadge'
import CustomerDragLayer from './CustomerDragLayer'
import Field from './InputField'
import UserData from './UserData'

const CurrencyBadgeItem = styled('div')`
  & {
    flex: 33% 0 0;
  }
`

const CurrencyBadgeItems = styled('div')`
  & {
    display: flex;
    flex-wrap: wrap;
    border: rgba(255, 255, 255, 0.4) 5px solid;
    border-radius: 5px;
    padding: 8px 15px;
    background: #fff;
    background-clip: padding-box;
    transition: border-color 0.3s ease-in-out;
  }
  &:hover {
    border-color: rgba(255, 255, 255, 0.7);
  }
  &:focus,
  &:active {
    outline: none;
    border-color: #fff;
  }
`

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
          <CustomerDragLayer />
          <CurrencyBadgeItems>
            {currency.map(({name, id}, i) => (
              <CurrencyBadgeItem>
                <CurrencyBadge key={i} id={id} name={name} />
              </CurrencyBadgeItem>
            ))}
          </CurrencyBadgeItems>
        </DragDropContextProvider>
        <UserData walletIncome={currencyInput} walletOutgo={currencyOutput} />
      </Fragment>
    )
  }
}
