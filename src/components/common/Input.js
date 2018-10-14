import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Input component;
class Input extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  }

  render() {
    const {value, handleChange, placeholder} = this.props
    return (
      <input
        value={value}
        onChange={({target}) => handleChange(target.value)}
        placeholder={placeholder}
      />
    )
  }
}

export default Input
