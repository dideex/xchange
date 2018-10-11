import React from 'react'
import PropTypes from 'prop-types'

// CurrencyInput stateless component;
const CurrencyInput = ({value, background, handleChange}) => (
  <input
    type="text"
    onChange={({target}) => handleChange(target.value)}
    value={value}
    style={{background}}
  />
)

CurrencyInput.propTypes = {
  value: PropTypes.number.isRequired,
  background: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}
export default CurrencyInput
