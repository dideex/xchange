import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'
import styled from 'react-emotion'
import {CSSTransition} from 'react-transition-group'

import {Icons, Colors} from './common'
import './Nav.css'

const MenuWrap = styled('nav')`
  & {
    display: flex;
    align-items: center;
    & > span {
      position: relative;
    }
    & > span,
    & > a {
      cursor: pointer;
      padding: 0 35px;
      font-size: 18px;
    }
    & > a:first-child {
      padding-left: 0;
    }
    & > span:last-child {
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

const LangMenu = styled('span')`
  & {
    position: absolute;
    top: 100%;
    left: 25px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background: ${Colors.accent};
    box-shadow: 0px 5px 10px -4px rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 5px 10px;
    transition: all 300ms ease-in-out;
  }
  .auth-menu-item & {
    left: -10px;
  }
  &.content--enter {
    opacity: 0.01;
    transform: scale(0.9) translateY(-10px);
  }
  &.content--enter-active {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  &.content--exit {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  &.content--exit-active {
    opacity: 0.01;
    transform: scale(0.9) translateY(-10px);
  }
`

// Nav component;
@inject('userStore')
@observer
class Nav extends Component {
  constructor(props) {
    super(props)
    this.lastOffsetTop = 0
  }

  state = {
    minimizeNav: false,
    hideMenu: false,
    showLangMenu: false,
    showAuthMenu: false,
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
    const {login, token, signout, isAdmin} = this.props.userStore
    return (
      <NavWrap className={this._getStyle()}>
        <Icons style={logoStyle} id="logo" />
        <MenuWrap
          onMouseLeave={() => this.setState({showLangMenu: false, showAuthMenu: false})}
        >
          <Link to="/">Главная</Link>
          <Link to="/reservi">Резервы</Link>
          <Link to="/o-nas">О нас</Link>
          <Link to="/faq">FAQ</Link>
          <span
            onClick={() =>
              this.setState(({showLangMenu}) => ({
                showLangMenu: !showLangMenu,
                showAuthMenu: false,
              }))
            }
          >
            Rus
            <Icons
              id="chevron"
              style={{width: '20px', marginBottom: '-2px', paddingLeft: '5px'}}
            />
            <CSSTransition
              in={this.state.showLangMenu}
              timeout={300}
              classNames="content-"
              unmountOnExit
            >
              <LangMenu>
                <span>Eng</span>
                <span>Rus</span>
              </LangMenu>
            </CSSTransition>
          </span>
          <span
            className="auth-menu-item"
            onClick={() =>
              this.setState(({showAuthMenu}) => ({
                showAuthMenu: !showAuthMenu,
                showLangMenu: false,
              }))
            }
          >
            <Icons style={{width: '33px'}} id="user" />
            <CSSTransition
              in={this.state.showAuthMenu}
              timeout={300}
              classNames="content-"
              unmountOnExit
            >
              {token ? (
                <LangMenu>
                  {isAdmin && <Link to="/summary">Admin</Link>}
                  <Link to="/lichnii-kabinet">{login}</Link>
                  <p
                    onClick={e => {
                      e.stopPropagation()
                      signout()
                    }}
                  >
                    Выйти
                  </p>
                </LangMenu>
              ) : (
                <LangMenu>
                  <Link to="/lichnii-kabinet">Войти</Link>
                  <Link to="/registracya">Регистрация</Link>
                </LangMenu>
              )}
            </CSSTransition>
          </span>
        </MenuWrap>
      </NavWrap>
    )
  }
}

export default Nav
