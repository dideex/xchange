import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Button component;
class Button extends Component {
  static propTypes = {
    toggle: PropTypes.func.isRequired,
    caption: PropTypes.string.isRequired,
  }

  render() {
    const {caption, toggle} = this.props
    return <button onClick={toggle}>{caption}</button>
  }
}

export default Button
