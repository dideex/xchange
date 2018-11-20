import React from 'react'
import PropTypes from 'prop-types'

import {Input} from '../../common'

// CurrencyInput stateless component;
const CurrencyInput = ({value = '', handleChange, onBlur}) => (
  <Input
    style={{padding: '10px 34px', textAlign: 'center', width: '100%'}}
    handleChange={handleChange}
    value={`${value}`}
    onBlur={onBlur}
    placeholder="value"
  />
)

CurrencyInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
}
export default CurrencyInput
