import React, {Component, Fragment} from 'react'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'
import styled from 'react-emotion'
import {CSSTransition} from 'react-transition-group'
import {isMobile} from 'react-device-detect'

import {Icons, Colors, ScrollTo} from './common'
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
      font-size: 1.8rem;
      @media (max-width: 1024px) {
        padding: 0 15px;
      }
    }
    & > a:first-child {
      padding-left: 0;
    }
    & > span:last-child {
      padding-right: 0;
    }
    @media (max-width: 767px) {
      display: none;
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
  @media (max-width: 1024px) {
    padding: 50px 15px 0;
  }
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
    @media (max-width: 1024px) {
      left: -85px;
    }
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

const MobMenu = styled('div')`
  & {
    z-index: 1000;
    background-color: ${Colors.accent};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 10vh 15vw;
    display: flex;
    flex-direction: column;
    transform: translatex(${({x}) => x});
    transition: transform 0.3s ease-in-out;
    a,
    span {
      font-size: 3rem;
    }
    .close {
      position: absolute;
      right: 35px;
    }
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
    showMobMenu: false,
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

  _handleLinkClick = () => {
    this.setState({showMobMenu: false, showLangMenu: false})
    ScrollTo(document.querySelector('main').getBoundingClientRect().top)
  }

  _toggleLangMenu = () =>
    this.setState(({showLangMenu}) => ({
      showLangMenu: !showLangMenu,
      showAuthMenu: false,
    }))

  _getStyle = () =>
    `${this.state.minimizeNav ? 'min-nav' : ''} ${this.state.hideMenu ? 'hide-nav' : ''}`

  render() {
    const {login, token, signout, isAdmin} = this.props.userStore
    const {showLangMenu, showAuthMenu} = this.state
    return (
      <Fragment>
        {isMobile && (
          <MobMenu x={this.state.showMobMenu ? '0%' : '100%'}>
            <div
              onClick={() => this.setState({showMobMenu: false, showLangMenu: false})}
              className="close"
            >
              <Icons style={{width: 30}} id="close" />
            </div>
            <Link onClick={this._handleLinkClick} to="/">
              Главная
            </Link>
            <Link onClick={this._handleLinkClick} to="/reservi">
              Резервы
            </Link>
            <Link onClick={this._handleLinkClick} to="/o-nas">
              О нас
            </Link>
            <Link onClick={this._handleLinkClick} to="/faq">
              FAQ
            </Link>
            <span onClick={this._toggleLangMenu}>Язык</span>
            {showLangMenu && (
              <p>
                <span onClick={this._handleLinkClick}>Eng</span>
                <span onClick={this._handleLinkClick}>Rus</span>
              </p>
            )}

            {token ? (
              <Fragment>
                {isAdmin && (
                  <Link onClick={this._handleLinkClick} to="/summary">
                    Admin
                  </Link>
                )}
                {isAdmin && (
                  <Link onClick={this._handleLinkClick} to="/settings">
                    Settings
                  </Link>
                )}
                <Link to="/lichnii-kabinet">{login}</Link>
                <span
                  onClick={e => {
                    e.stopPropagation()
                    signout()
                  }}
                >
                  Выйти
                </span>
              </Fragment>
            ) : (
              <Fragment>
                <Link onClick={this._handleLinkClick} to="/lichnii-kabinet">
                  Войти
                </Link>
                <Link onClick={this._handleLinkClick} to="/registracya">
                  Регистрация
                </Link>
              </Fragment>
            )}
          </MobMenu>
        )}
        <NavWrap className={this._getStyle()}>
          <Icons style={logoStyle} id="logo" />

          {!isMobile ? (
            <MenuWrap
              onMouseLeave={() =>
                this.setState({showLangMenu: false, showAuthMenu: false})
              }
            >
              <Link onClick={this._handleLinkClick} to="/">
                Главная
              </Link>
              <Link onClick={this._handleLinkClick} to="/reservi">
                Резервы
              </Link>
              <Link onClick={this._handleLinkClick} to="/o-nas">
                О нас
              </Link>
              <Link onClick={this._handleLinkClick} to="/faq">
                FAQ
              </Link>
              <span onClick={this._toggleLangMenu}>
                Rus
                <Icons
                  id="chevron"
                  style={{width: '20px', marginBottom: '-2px', paddingLeft: '5px'}}
                />
                <CSSTransition
                  in={showLangMenu}
                  timeout={300}
                  classNames="content-"
                  unmountOnExit
                >
                  <LangMenu>
                    <span onClick={this._handleLinkClick}>Eng</span>
                    <span onClick={this._handleLinkClick}>Rus</span>
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
                  in={showAuthMenu}
                  timeout={300}
                  classNames="content-"
                  unmountOnExit
                >
                  {token ? (
                    <LangMenu>
                      {isAdmin && (
                        <Link onClick={this._handleLinkClick} to="/summary">
                          Admin
                        </Link>
                      )}
                      {isAdmin && (
                        <Link onClick={this._handleLinkClick} to="/settings">
                          Settings
                        </Link>
                      )}
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
          ) : (
            <div
              onClick={() =>
                this.setState(({showMobMenu}) => ({showMobMenu: !showMobMenu}))
              }
            >
              <Icons id="menu" style={{width: 30}} />
            </div>
          )}
        </NavWrap>
      </Fragment>
    )
  }
}

export default Nav
