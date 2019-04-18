import React, {Component, Fragment} from 'react'
import {observer, inject} from 'mobx-react'
import styled from 'react-emotion'
import {isMobile} from 'react-device-detect'

import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'
import {Icons, ScrollTo} from '../common'
import './Nav.css'

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


// Component has navigation 
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

  toggleLangMenu = ({showLangMenu}) =>
    this.setState({showLangMenu: !showLangMenu, showAuthMenu: false})

  toggleAuthMenu = ({showAuthMenu}) =>
    this.setState({showLangMenu: false, showAuthMenu: !showAuthMenu})

  toggleMobMenu = ({showMobMenu}) =>
    this.setState({showLangMenu: false, showMobMenu: !showMobMenu})

  closeAllPopovers = () =>
    this.setState({showLangMenu: false, showAuthMenu: false, showMobMenu: false})

  handleClick = () => {
    this.setState({showMobMenu: false, showLangMenu: false})
    ScrollTo(document.querySelector('main').getBoundingClientRect().top)
  }

  _getStyle = () =>
    `${this.state.minimizeNav ? 'min-nav' : ''} ${this.state.hideMenu ? 'hide-nav' : ''}`

  render() {
    const {minimizeNav, hideMenu, ...menuState} = this.state
    return (
      <Fragment>
        {isMobile && (
          <MobileMenu
            {...menuState}
            handleClick={this.handleClick}
            closeBothMenu={this.closeAllPopovers}
          />
        )}
        <NavWrap className={this._getStyle()}>
          <Icons style={logoStyle} id="logo" />

          {!isMobile ? (
            <DesktopMenu
              {...menuState}
              handleClick={this.handleClick}
              closeBothMenu={this.closeAllPopovers}
              toggleLangMenu={this.toggleLangMenu}
              toggleAuthMenu={this.toggleAuthMenu}
            />
          ) : (
            <div
              onClick={() =>
                this.setState(({showMobMenu}) => ({showMobMenu: !showMobMenu}))
              }
              data-testid="mob-menu-toggler"
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
