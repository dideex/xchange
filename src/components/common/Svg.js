import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Svg component;
class Svg extends Component {
  static propTypes = {}

  render() {
    return (
      <svg version="1.1" x="0px" y="0px" viewBox="0 0 400 400">
        <circle style={{fill: '#EDDA48'}} cx="199.5" cy="200.5" r="199.5" />
        <circle style={{fill: '#E2B255'}} cx="199.5" cy="200.5" r="168.3" />
        <path
          style={{fill: '#EDDA48'}}
          d="M262.5,193.9c47-38.9-0.7-74.8-36.9-73.2v-38h-26.1v38.5H186V82.8h-24.2v38h-45.1v22.5h28.6v119.9h-28.6v23.1
   h45.1v37.4h23.7v-37.9h14.1v37.9h23.9v-37.9C279,284.1,319.4,238.7,262.5,193.9z M186,145.8h34.4c13.2,1.4,26.2,27.8,0,42.1H186
   V145.8z M225.1,261.9H186v-49.6h39.1C252.9,220.8,254.8,249.2,225.1,261.9z"
        />
      </svg>
    )
  }
}

export default Svg
