import React, {Component, Fragment} from 'react'

import ReservedContent from '../components/ControlPanel'
import Main from '../components/Main'

// CP component; Control Panel route, contains all protected information for the user and admin
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
