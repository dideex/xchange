import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'react-emotion'

import {Icons} from './common'

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

// Nav component;
class Nav extends Component {
  render() {
    return (
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
    )
  }
}

export default Nav
