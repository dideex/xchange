import React, {Component} from 'react'
import styled from 'react-emotion'

import {Icons, container, AccentButton} from '../common'
import NavMenu from '../Nav'

const StyledHeader = styled('header')`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`
const NavWrap = styled('nav')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 50px;
  ${container};
`
const ContentWrap = styled('div')`
  & {
    ${container};
    position: relative;
    padding: 100px 60px 220px;
    margin-top: auto;
    h1 {
      font-family: 'Roboto Slab';
      font-size: 64px;
      line-height: 1.2;
    }
    p {
      font-size: 18px;
      line-height: 1.5;
      margin: 20px 0;
    }
  }
`

const headerBgTopStyle = {
  width: '70%',
  position: 'absolute',
  zIndex: -1,
}
const headerBgBottomStyle = {
  width: '70%',
  position: 'absolute',
  bottom: -1,
  right: -1,
  zIndex: -1,
}
const manAndBasketStyle = {
  width: 196,
  position: 'absolute',
  bottom: 0,
  left: 90,
  zIndex: 0,
}

const girlWithCoinsStyle = {
  width: 169,
  position: 'absolute',
  bottom: 50,
  left: 590,
  zIndex: 0,
}
const manWithGraphisStyle = {
  width: 127,
  position: 'absolute',
  bottom: 180,
  left: 670,
  zIndex: 0,
}
const safeStyle = {
  width: 85,
  position: 'absolute',
  bottom: 210,
  right: 250,
  zIndex: 0,
}
const manWorkingStyle = {
  width: 179,
  position: 'absolute',
  bottom: 210,
  right: 75,
  zIndex: 0,
}
const manHappyStyle = {
  width: 121,
  position: 'absolute',
  bottom: 0,
  right: 0,
  zIndex: 0,
}

const logoStyle = {
  width: '215px',
}

// Header component;
class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <Icons style={headerBgTopStyle} id="headerBgTop" />
        <Icons style={headerBgBottomStyle} id="headerBgBottom" />
        <NavWrap>
          <Icons style={logoStyle} id="logo" />
          <NavMenu />
        </NavWrap>
        <ContentWrap>
          <h1>Обмен валют</h1>
          <p>
            Здесь вы можете конвертировать Ваши деньги
            <br /> С минимальной комиссией
          </p>
          <AccentButton toggle={() => {}}>Смотреть</AccentButton>
          <Icons style={manAndBasketStyle} id="manAndBasket" />
          <Icons style={girlWithCoinsStyle} id="girlWithCoins" />
          <Icons style={manWithGraphisStyle} id="manWithGraphis" />
          <Icons style={safeStyle} id="safe" />
          <Icons style={manWorkingStyle} id="manWorking" />
          <Icons style={manHappyStyle} id="manHappy" />
        </ContentWrap>
      </StyledHeader>
    )
  }
}

export default Header
