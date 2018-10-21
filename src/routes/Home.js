import React, {Component, Fragment} from 'react'

import Converter from '../components/Converter'
import Main from '../components/Main'
import HowTo from '../components/HowTo'

// Home component;
export class Home extends Component {
  render() {
    return (
      <Fragment>
        <Main>
          <Converter />
        </Main>
        <HowTo />
      </Fragment>
    )
  }
}

export default Home
