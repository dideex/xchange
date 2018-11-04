import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {
  Icons,
  CurrencyIcons,
  Colors,
  robotoSlab,
  statusArray,
  currencyFormat,
} from '../common'

const OperationWrap = styled('div')`
  & {
    flex: 30.33% 0 0;
    position: relative;
    border-radius: 10px;
    background-color: ${Colors.accent};
    padding: 20px 15px;
    margin-bottom: 35px;
    margin-left: 1.5%;
    margin-right: 1.5%;
  }
`
const BacksideBlock = styled('div')`
  & {
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 15px 3px;
    background-color: ${Colors.darkAccent};
    border-radius: 10px;
    transform: translateY(35px);
  }
  & p {
    position: absolute;
    bottom: 3px;
    left: 25px;
    right: 25px;
    display: flex;
    justify-content: space-between;
  }
  & span {
    color: #fff;
  }
`

const Title = styled('h3')`
  font-family: ${robotoSlab};
  text-align: center;
`

const Values = styled('div')`
  & {
    display: flex;
    position: relative;
    justify-content: space-between;
    padding: 20px 10px;
  }
  & .separator {
    width: 25px;
    transform: rotate(-90deg);
  }
`

const SvgWrap = styled('div')`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 25px;
  height: 25px;
  margin: auto;
`

const Value = styled('div')`
  flex: 45% 0 0;
  max-width: 45%;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
`

const CoinStyles = {
  position: 'absolute',
  width: 40,
  left: 15,
  top: 15,
}

// Operations stateless component;
export const Operations = ({
  currency,
  email,
  inputValue,
  outputValue,
  paymentStatus,
  inputLabel,
  outputLabel,
}) => {
  return (
    <OperationWrap>
      <CurrencyIcons id={currency} style={CoinStyles} />
      <Title>{email}</Title>
      <Values>
        <Value>
          <span>{`${currencyFormat(inputValue)}${inputLabel}`}</span>
        </Value>
        <SvgWrap>
          <Icons id="chevron" style={{fill: Colors.black}} className="separator" />
        </SvgWrap>
        <Value>
          <span>{`${currencyFormat(outputValue)}${outputLabel}`}</span>
        </Value>
      </Values>
      <BacksideBlock>
        <p>
          <span>Статус:</span>
          <span>{statusArray[paymentStatus]}</span>
        </p>
      </BacksideBlock>
    </OperationWrap>
  )
}

Operations.propTypes = {
  currency: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  outputValue: PropTypes.string.isRequired,
  paymentStatus: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  outputLabel: PropTypes.string.isRequired,
}
export default Operations
