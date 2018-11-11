import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import styled from 'react-emotion'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import ExchangeRate from './ExchangeRate'
import CustomerDragLayer from './CustomerDragLayer'
import Field from './InputField'
import UserData from './UserData'
import CurrencyDNDArea from './CurrencyDNDArea'

import {MainSectionWrap} from '../common'

const CurrencyFieldsWrap = styled('div')`
  & {
    display: flex;
    justify-content: space-between;
    margin: 0 5px;
    padding-bottom: 50px;
  }
`
const CurrencyFieldWrap = styled('div')`
  & {
    flex: 37% 0 0;
  }
`
const CurrencyRateWrap = styled('div')`
  & {
    flex: 26% 0 0;
  }
`
const TipBlock = styled('div')`
  & {
    color: #fff;
    font-size: 1.4rem;
    padding: 0 10px;
    text-align: right;
    letter-spacing: 0.5px;
  }
`

export const CurrencyTitle = styled('h2')`
  font-family: 'Roboto Slab';
  font-size: 3rem;
  text-align: center;
`

// TODO: add diffirences between currencies
@DragDropContext(HTML5Backend)
@inject('cashStore')
@observer
export default class Index extends Component {
  componentDidMount() {
    this.props.cashStore.fetchCurrency()
  }

  render() {
    const {
      loading,
      inputValue,
      outputValue,
      changeInput,
      changeOutput,
      currency,
      currencyInput,
      currencyOutput,
      setCurrencyInput,
      setCurrencyOutput,
      getMinimalAmount,
      getCurrencyReserve,
      userRate,
    } = this.props.cashStore
    return (
      <MainSectionWrap>
        <CurrencyFieldsWrap style={{display: 'flex', margin: '0 -5px'}}>
          <CurrencyFieldWrap className="left__input">
            <CurrencyTitle>Отдаете</CurrencyTitle>
            <Field
              inputValue={`${inputValue}`}
              changeInput={changeInput}
              onSelectChange={setCurrencyInput}
              currencyId={currencyInput}
            />
            <TipBlock className="tip__block">
              <span>Минимум: {getMinimalAmount}</span>
            </TipBlock>
          </CurrencyFieldWrap>
          <CurrencyRateWrap>
            <ExchangeRate
              loading={loading && currency.length === 0}
              inputCurrency={`${currency.length && currency[currencyInput].price_usd}`}
              outputCurrency={`${currency.length && currency[currencyOutput].price_usd}`}
              rate={userRate}
            />
          </CurrencyRateWrap>
          <CurrencyFieldWrap className="right__input">
            <CurrencyTitle>Получаете</CurrencyTitle>
            <Field
              inputValue={`${outputValue}`}
              changeInput={changeOutput}
              onSelectChange={setCurrencyOutput}
              currencyId={currencyOutput}
            />
            <TipBlock className="tip__block">
              <span>Резерв: {getCurrencyReserve}</span>
            </TipBlock>
          </CurrencyFieldWrap>
        </CurrencyFieldsWrap>
        <CustomerDragLayer />
        <CurrencyDNDArea currency={currency} loading={loading} />
        <UserData walletIncome={currencyInput} walletOutgo={currencyOutput} />
      </MainSectionWrap>
    )
  }
}
