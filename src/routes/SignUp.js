import React, {Component, Fragment} from 'react'

import ReservedContent from '../components/ControlPanel/Signup'
import Main from '../components/Main'
// Signup component;
export class Signup extends Component {
  render() {
    return (
      <Fragment>
        <Main>
          <ReservedContent />
        </Main>
      </Fragment>
    )
  }
}

export default Signup
