import React from 'react'
import PropTypes from 'prop-types'

// CurrencySelect stateless component;
const CurrencySelect = ({id, currency, handleChange}) => (
  <select name="id" onChange={({target}) => handleChange(target.value)}>
    {currency.map(({name, id: _id}, i) => (
      <option value={_id} key={i} selected={id === _id}>
        {name}
      </option>
    ))}
  </select>
)

CurrencySelect.propTypes = {
  id: PropTypes.number.isRequired,
  currency: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
}
export default CurrencySelect
