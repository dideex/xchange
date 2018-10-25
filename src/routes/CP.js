import React, {Component, Fragment} from 'react'

import ReservedContent from '../components/ControlPanel'
import Main from '../components/Main'
// CP component;
export class CP extends Component {
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

export default CP
