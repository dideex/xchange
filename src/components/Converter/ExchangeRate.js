import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {CurrencyTitle} from './index'
import {currencyFormat} from '../common'

const Wrap = styled('div')`
  & {
    span {
      margin-top: auto;
    }
    h2 {
      font-size: 20px;
      padding-bottom: 17px;
    }
  }
`

const ExchangeRateContent = styled('div')`
  & {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px;
    span {
      font-weight: 700;
    }
  }
`

// ExchangeRate component;
class ExchangeRate extends Component {
  static propTypes = {
    inputCurrency: PropTypes.string.isRequired,
    outputCurrency: PropTypes.string.isRequired,
  }

  render() {
    const {inputCurrency, outputCurrency} = this.props
    const maxValue = Math.max(inputCurrency, outputCurrency)
    return (
      <Wrap>
        <CurrencyTitle>Курс обмена</CurrencyTitle>
        <ExchangeRateContent>
          <span>{currencyFormat(maxValue / inputCurrency)}</span>
          <span>{currencyFormat(maxValue / outputCurrency)}</span>
        </ExchangeRateContent>
      </Wrap>
    )
  }
}

export default ExchangeRate
