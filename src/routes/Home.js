import React, {Component} from 'react'

import Converter from '../components/Converter'
import Main from '../components/Main'

// Home component;
export class Home extends Component {
  render() {
    return (
      <Main>
        <Converter />
      </Main>
    )
  }
}

export default Home
