import React, {Component} from 'react'
import styled from 'react-emotion'

import {Icons, container, AccentButton, ScrollTo} from '../common'

const StyledHeader = styled('header')`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ContentWrap = styled('div')`
  & {
    ${container};
    position: relative;
    padding: 210px 60px 220px;
    margin-top: auto;
    h1 {
      font-family: 'Roboto Slab';
      font-size: 6.4rem;
      line-height: 1.2;
    }
    p {
      font-size: 1.8rem;
      line-height: 1.5;
      margin: 20px 0;
    }
    .manAndBasket {
      width: 196px;
      position: absolute;
      bottom: 0px;
      left: 90px;
      z-index: 0;
      @media (max-width: 1024px) {
        width: 159px;
      } 
    }
    .girlWithCoins {
      width: 169px;
      position: absolute;
      bottom: 50px;
      left: 44%;
      z-index: 0;
      @media (max-width: 1024px) {
        width: 129px;
        bottom: 20px;
      } 
    }
    .manWithGraphis {
      width: 127px;
      position: absolute;
      bottom: 180px;
      left: 50.5%;
      z-index: 0;
      @media (max-width: 1024px) {
        width: 87px;
        bottom: 100px;
      } 
    }
    .safe {
      width: 85px;
      position: absolute;
      bottom: 210px;
      right: 23.9%;
      z-index: 0;
      @media (max-width: 1024px) {
        width: 45px;
        bottom: 130px;
      } 
    }
    .manWorking {
      width: 179px;
      position: absolute;
      bottom: 210px;
      right: 6.5%;
      z-index: 0;
      @media (max-width: 1024px) {
        width: 139px;
        bottom: 130px;
      } 
    }
    .manHappy {
      width: 121px;
      position: absolute;
      bottom: 0px;
      right: 0px;
      z-index: 0;
      @media (max-width: 1024px) {
        width: 81px;
      } 
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

// Header component;
class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <Icons style={headerBgTopStyle} id="headerBgTop" />
        <Icons style={headerBgBottomStyle} id="headerBgBottom" />
        <ContentWrap>
          <h1>Обмен валют</h1>
          <p>
            Здесь вы можете конвертировать Ваши деньги
            <br /> С минимальной комиссией
          </p>
          <AccentButton
            toggle={() =>
              ScrollTo(document.querySelector('main').getBoundingClientRect().top + 100)
            }
          >
            Начать
          </AccentButton>
          <Icons className="manAndBasket" id="manAndBasket" />
          <Icons className="girlWithCoins" id="girlWithCoins" />
          <Icons className="manWithGraphis" id="manWithGraphis" />
          <Icons className="safe" id="safe" />
          <Icons className="manWorking" id="manWorking" />
          <Icons className="manHappy" id="manHappy" />
        </ContentWrap>
      </StyledHeader>
    )
  }
}

export default Header
