import React, {Component} from 'react'
import styled from 'react-emotion'
import {FormattedMessage} from 'react-intl'
import {withRouter} from 'react-router-dom'

import {Icons, container, AccentButton, ScrollTo, linesToParagraphs} from '../common'

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
    @media (max-width: 767px) {
      padding-left: 15px;
      padding-right: 15px;
    }
    h1 {
      font-family: 'Roboto Slab';
      font-size: 6.4rem;
      line-height: 1.2;
      @media (max-width: 767px) {
        font-size: 4.4rem;
      }
    }
    p {
      font-size: 1.8rem;
      line-height: 1.5;
      margin: 20px 0;
      @media (max-width: 767px) {
        font-size: 1.4rem;
      }
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
      @media (max-width: 767px) {
        width: 109px;
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
      @media (max-width: 767px) {
        display: none;
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
      @media (max-width: 767px) {
        display: none;
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
      @media (max-width: 767px) {
        width: 45px;
        bottom: 40px;
        right: 30%;
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
      @media (max-width: 767px) {
        width: 89px;
        bottom: 40px;
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
      @media (max-width: 767px) {
        display: none;
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

// Component contains header, includes the navigation, main titles and svg-icons
@withRouter
class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <Icons style={headerBgTopStyle} id="headerBgTop" />
        <Icons style={headerBgBottomStyle} id="headerBgBottom" />
        <ContentWrap>
          <h1>
            <FormattedMessage id="home.header" defaultMessage="Currency exchange" />
          </h1>
          <p>
            <FormattedMessage
              id="home.subHeader"
              defaultMessage="Здесь вы можете конвертировать Ваши деньги"
            >
              {linesToParagraphs}
            </FormattedMessage>
          </p>
          <AccentButton
            toggle={() => {
              ScrollTo(document.querySelector('main').getBoundingClientRect().top + 100)
              this.props.history.push('/')
            }}
          >
            <FormattedMessage id="home.acctionButton" defaultMessage="Начать" />
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
