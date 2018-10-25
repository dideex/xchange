import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'react-emotion'

import {Icons} from './common'
import './Nav.css'

const MenuWrap = styled('nav')`
  & {
    display: flex;
    align-items: center;
    a {
      padding: 0 35px;
      font-size: 18px;
    }
    a:first-child {
      padding-left: 0;
    }
    a:last-child {
      padding-right: 0;
    }
  }
`
const logoStyle = {
  width: '215px',
}

const NavWrap = styled('nav')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px calc((100vw - 1180px) / 2) 0;
  transition: all 0.3s ease-in-out;
`

// Nav component;
class Nav extends Component {
  constructor(props) {
    super(props)
    this.lastOffsetTop = 0
  }

  state = {
    minimizeNav: false,
    hideMenu: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll)
  }

  _handleScroll = () => {
    const minimizeNav = window.pageYOffset > 100
    const hideMenu = window.pageYOffset > this.lastOffsetTop && window.pageYOffset > 200
    this.setState({hideMenu, minimizeNav})

    this.lastOffsetTop = window.pageYOffset
  }

  _getStyle = () =>
    `${this.state.minimizeNav ? 'min-nav' : ''} ${this.state.hideMenu ? 'hide-nav' : ''}`
  render() {
    return (
      <NavWrap className={this._getStyle()}>
        <Icons style={logoStyle} id="logo" />
        <MenuWrap>
          <Link to="/">Главная</Link>
          <Link to="/reservi">Резервы</Link>
          <Link to="/o-nas">О нас</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/">Rus</Link>
          <Link to="/lichnii-kabinet">
            <Icons style={{width: '33px'}} id="user" />
          </Link>
        </MenuWrap>
      </NavWrap>
    )
  }
}

export default Nav
