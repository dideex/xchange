import React, {Component} from 'react'
import {Link} from 'react-router-dom'

// Nav component;
class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/spasibo">Спасибо</Link>
        <Link to="/reservi">Резервы</Link>
        <Link to="/o-nas">О нас</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/lichnii-kabinet">Личный кабинет</Link>
        <Link to="/signup">Регистрация</Link>
        <Link to="/Not-found">404</Link>
      </nav>
    )
  }
}

export default Nav
