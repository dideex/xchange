import React, {Component} from 'react'
import styled from 'react-emotion'
import {CSSTransition} from 'react-transition-group'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'

import {Icons, Colors} from '../common'
import CommonLinks from './CommonLinks'
import LangMenu from './LangMenu'
import LoginMenu from './LoginMenu'

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

const Popover = styled('span')`
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

// DesktopMenu component;
class DesktopMenu extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    showLangMenu: PropTypes.bool.isRequired,
    showAuthMenu: PropTypes.bool.isRequired,
    closeBothMenu: PropTypes.func.isRequired,
    toggleLangMenu: PropTypes.func.isRequired,
    toggleAuthMenu: PropTypes.func.isRequired,
  }

  render() {
    const {
      handleClick,
      showLangMenu,
      showAuthMenu,
      closeBothMenu,
      toggleLangMenu,
      toggleAuthMenu,
    } = this.props
    return (
      <MenuWrap onMouseLeave={closeBothMenu}>
        <CommonLinks handleClick={handleClick} />
        <span onClick={toggleLangMenu}>
          <FormattedMessage id="home.nav.lang" defaultMessage="Language"/>
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
            <Popover>
              <LangMenu handleClick={handleClick} />
            </Popover>
          </CSSTransition>
        </span>
        <span className="auth-menu-item" onClick={toggleAuthMenu}>
          <Icons style={{width: '33px'}} id="user" />
          <CSSTransition
            in={showAuthMenu}
            timeout={300}
            classNames="content-"
            unmountOnExit
          >
            <Popover>
              <LoginMenu handleClick={handleClick} />
            </Popover>
          </CSSTransition>
        </span>
      </MenuWrap>
    )
  }
}

export default DesktopMenu
