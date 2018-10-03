import React, {Component} from 'react'
import {Link} from 'react-router-dom'

// Nav component;
class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/faq">FAQ</Link>
      </nav>
    )
  }
}

export default Nav
