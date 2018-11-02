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
  }

  render() {
    let {inputCurrency = 1, outputCurrency = 1, loading} = this.props
    if (+inputCurrency === 0) inputCurrency = 1
    if (+outputCurrency === 0) outputCurrency = 1
    const maxValue = Math.max(inputCurrency, outputCurrency)
    return (
      <Wrap>
        <CurrencyTitle>Курс обмена</CurrencyTitle>
        <ExchangeRateContent>
          {loading ? (
            <Loading size="inline" />
          ) : (
            <Fragment>
              <span>{currencyFormat(maxValue / inputCurrency)}</span>
              <span>{currencyFormat(maxValue / outputCurrency)}</span>
            </Fragment>
          )}
        </ExchangeRateContent>
      </Wrap>
    )
  }
}

export default ExchangeRate
