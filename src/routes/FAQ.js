import React, {Component, Fragment} from 'react'

import ReservedContent from '../components/FAQ'
import Main from '../components/Main'
// FAQ component; Frequently asked Questions
// Contains tab with answers 
export class FAQ extends Component {
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

export default FAQ
