import React, {Fragment} from 'react'
import styled from 'react-emotion'

import {Colors, container, Icons, CurrencyIcons} from '../common'

const MainStyled = styled('main')`
  & {
    padding: 50px 0;
    ${container}
    background-color: ${Colors.accent};
    border-radius: 10px;
    @media (max-width: 1024px) {
      padding: 25px 0;
    } 
  }
`

const MainBG = styled('section')`
  background-image: linear-gradient(
    90deg,
    white 50%,
    ${Colors.subAccent} 0,
    ${Colors.subAccent} 100%
  );
`

const AfterMainWrap = styled('section')`
  & {
    position: relative;
    min-height: 400px;
  }
  & svg {
    position: absolute;
  }
  & .main__bottom-background {
    right: 0;
  }
  & .main__bottom-bigcoin {
    right: calc(50% - 150px);
    top: 50px;
    transform: rotate(50deg);
    @media (max-width: 767px) {
      transform: rotate(50deg) scale(0.9);
    }
  }
  & .main__bottom-smallcoin {
    right: 150px;
    top: 30px;
    transform: rotate(-80deg);
  }
  & .main__bottom-dollar {
    right: 250px;
    top: 90px;
  }
  & .main__bottom-card {
    right: 50px;
    top: 190px;
  }
`

// Main wrapper component, includes icons after
export default ({children}) => (
  <Fragment>
    <MainBG>
      <MainStyled>{children}</MainStyled>
    </MainBG>
    <AfterMainWrap>
      <Icons
        className="main__bottom-background"
        id="afterMainBg"
        style={{width: '60%'}}
      />
      <CurrencyIcons className="main__bottom-bigcoin" id="Bitcoin" style={{width: 166}} />
      <CurrencyIcons
        className="main__bottom-smallcoin"
        id="Bitcoin"
        style={{width: 84}}
      />
      <Icons className="main__bottom-dollar" id="dollar" style={{width: 204}} />
      <Icons className="main__bottom-card" id="creditCard" style={{width: 186}} />
    </AfterMainWrap>
  </Fragment>
)
