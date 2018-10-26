import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import styled from 'react-emotion'

import {H2, Input, Icons, CurrencyIcons, SvgCurrency} from '../common'

const ReservedWrap = styled('div')`
  & {
    padding: 0 60px;
  }
  & .icon-safe {
    display: block;
    width: 30%;
    margin: 10px auto;
  }
`
const ContentWrap = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const InputWrap = styled('div')`
  & {
    position: relative;
    flex: 37% 0 0;
    margin-bottom: 50px;
  }
  & .currency-item svg {
    position: absolute;
    left: 11px;
    top: 11px;
  }
  & .currency-item input {
    padding-left: 43px;
    padding-right: 43px;
  }
`

// Reserved component;
@inject('cashStore')
@observer
class Reserved extends Component {
  _getCurrencyReservedById = id =>
    `${this.props.cashStore.currency[id].reserve} ${
      this.props.cashStore.currency[id].label
    }`

  render() {
    const {currency} = this.props.cashStore
    return (
      <ReservedWrap>
        <H2>Наши резервы</H2>
        <ContentWrap>
          {currency.map(({name}, i) => (
            <InputWrap key={i}>
              <div className="currency-item">
                <Input value={this._getCurrencyReservedById(i)} handleChange={() => {}} />
                <CurrencyIcons id={name} style={SvgCurrency} />
              </div>
            </InputWrap>
          ))}
        </ContentWrap>
        <Icons className="icon-safe" id="safe" />
      </ReservedWrap>
    )
  }
}

export default Reserved