import React from 'react'
import PropTypes from 'prop-types'

import Input from '../../common/Input'

// CurrencyInput stateless component;
const CurrencyInput = ({value, background, handleChange}) => (
  <div style={{background}}>
    <Input
      handleChange={handleChange}
      value={`${value}`}
      placeholder="value"
    />
  </div>
)

CurrencyInput.propTypes = {
  value: PropTypes.number.isRequired,
  background: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}
export default CurrencyInput
