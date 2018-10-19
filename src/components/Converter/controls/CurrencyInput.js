import React from 'react'
import PropTypes from 'prop-types'

import Input from '../../common/Input'

// CurrencyInput stateless component;
const CurrencyInput = ({value, handleChange}) => (
  <Input
    style={{padding: '10px 34px', textAlign: 'center', width: '100%'}}
    handleChange={handleChange}
    value={`${value}`}
    placeholder="value"
  />
)

CurrencyInput.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
}
export default CurrencyInput
