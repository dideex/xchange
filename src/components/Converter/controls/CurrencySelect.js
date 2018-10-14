import React from 'react'
import PropTypes from 'prop-types'

// CurrencySelect stateless component;
const CurrencySelect = ({id, currency, handleChange}) => (
  <select name="id" onChange={({target}) => handleChange(target.value)} value={id}>
    {currency.map(({name, id: _id}, i) => (
      <option value={_id} key={i}>
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
