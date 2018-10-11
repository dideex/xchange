import React from 'react'
import PropTypes from 'prop-types'

// CurrencySelect stateless component;
const CurrencySelect = ({id, currency, handleChange, output}) => (
  <select
    defaultValue={id}
    name="id"
    onChange={({target}) => handleChange(target.value)}
  >
    {currency.map(
      ({name}, i) =>
        i !== +output ? (
          <option value={i} key={i}>
            {name}
          </option>
        ) : null,
    )}
  </select>
)

CurrencySelect.propTypes = {
  id: PropTypes.number.isRequired,
  currency: PropTypes.array.isRequired,
  output: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
}
export default CurrencySelect
