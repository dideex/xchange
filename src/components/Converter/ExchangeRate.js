import React, {Component, Fragment} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {CurrencyTitle} from './index'
import {currencyFormat, Loading} from '../common'

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
    loading: PropTypes.bool.isRequired,
    rate: PropTypes.number.isRequired,
  }

  render() {
    let {inputCurrency = 1, outputCurrency = 1, loading, rate} = this.props
    if (+inputCurrency === 0) inputCurrency = 1
    if (+outputCurrency === 0) outputCurrency = 1
    const maxValue = Math.max(inputCurrency, outputCurrency) * rate
    const inputRate = inputCurrency * (inputCurrency > outputCurrency? rate : 1)
    const outputRate = outputCurrency * (inputCurrency > outputCurrency? 1 : rate)
    return (
      <Wrap>
        <CurrencyTitle>Курс обмена</CurrencyTitle>
        <ExchangeRateContent>
          {loading ? (
            <Loading size="inline" />
          ) : (
            <Fragment>
              <span>{currencyFormat(maxValue / inputRate)}</span>
              <span>{currencyFormat(maxValue / outputRate)}</span>
            </Fragment>
          )}
        </ExchangeRateContent>
      </Wrap>
    )
  }
}

export default ExchangeRate
