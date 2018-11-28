import React, {Component, Fragment} from 'react'

import ReservedContent from '../components/Reserved'
import Main from '../components/Main'

// Reserved component; Contains informations about a currency's reseerve
export class Reserved extends Component {
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

export default Reserved
