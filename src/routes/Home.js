import React, {Component, Fragment} from 'react'

import Converter from '../components/Converter'
import Main from '../components/Main'
import HowTo from '../components/HowTo'
import Bg from '../components/ContainerWithBg'
import LastOperations from '../components/LastOperations'
import Graphic from '../components/Graphic'

// Home component;
export class Home extends Component {
  render() {
    return (
      <Fragment>
        <Main>
          <Converter />
        </Main>
        <HowTo />
        <Bg>
          <LastOperations />
          <Graphic />
        </Bg>
      </Fragment>
    )
  }
}

export default Home
