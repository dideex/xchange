import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {Icons, Colors} from '../common'
import LoginMenu from './LoginMenu'
import CommonLinks from './CommonLinks'
import LangMenu from './LangMenu'

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
    p,
    span {
      font-size: 3rem;
    }
    .close {
      position: absolute;
      right: 35px;
    }
  }
`

// Component has mobile menu links
const MobileMenu = ({handleClick, showLangMenu, showMobMenu, closeBothMenu}) => (
  <MobMenu x={showMobMenu ? '0%' : '100%'}>
    <div onClick={closeBothMenu} className="close">
      <Icons style={{width: 30}} id="close" />
    </div>
    <CommonLinks handleClick={handleClick} />
    <span onClick={handleClick}>Язык</span>
    {showLangMenu && (
      <p>
        <LangMenu handleClick={handleClick} />
      </p>
    )}

    <LoginMenu handleClick={handleClick} />
  </MobMenu>
)

MobileMenu.propTypes = {
  handleClick: PropTypes.func.isRequired,
  showLangMenu: PropTypes.bool.isRequired,
  showMobMenu: PropTypes.bool.isRequired,
  closeBothMenu: PropTypes.func.isRequired,
}
export default MobileMenu
