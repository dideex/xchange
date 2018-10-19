import React, {Component} from 'react'
import styled from 'react-emotion'

import {Colors, container} from '../common'

const MainStyled = styled('main')`
  & {
    padding: 50px 0;
    ${container}
    background-color: ${Colors.accent};
    border-radius: 10px;
  }
`

const MainBG = styled('div')`
  background-image: linear-gradient(90deg,
    white 50%,
    ${Colors.subAccent} 0,
    ${Colors.subAccent} 100%
  );
`

// Main component;
class Main extends Component {
  render() {
    return (
      <MainBG>
        <MainStyled>{this.props.children}</MainStyled>
      </MainBG>
    )
  }
}

export default Main
