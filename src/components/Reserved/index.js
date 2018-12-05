import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import styled from 'react-emotion'
import {FormattedMessage} from 'react-intl'

import {H2, Icons, CurrencyIcons, SvgCurrency, AccentBlock} from '../common'

const ReservedWrap = styled('div')`
  & {
    padding: 0 60px;
    @media (max-width: 1024px) {
      padding: 0 30px;
    }
    @media (max-width: 767px) {
      padding: 0 15px;
    }
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
    @media (max-width: 1024px) {
      flex: 100% 0 0;
    }
    p {
      padding-left: 11px;
    }
    .currency-item svg {
      position: absolute;
      left: 11px;
      bottom: 11px;
      @media (max-width: 1024px) {
        bottom: 8px;
      }
    }
    .currency-item div {
      padding-left: 23px;
      padding-right: 23px;
    }
  }
`

// Component has information about the company reserves
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
        <H2>
          <FormattedMessage id="reserved.header" defaultMessage="Наши резервы" />
        </H2>
        <ContentWrap>
          {currency.map(({icon, name}, i) => (
            <InputWrap key={i}>
              <p>{name}</p>
              <div className="currency-item">
                <AccentBlock value={this._getCurrencyReservedById(i)} />
                <CurrencyIcons id={icon} style={SvgCurrency} />
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
