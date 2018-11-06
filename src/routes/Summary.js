import React, {Component, Fragment} from 'react'

import Content from '../components/Admin'
import Main from '../components/Main'
// Summary component;
export class Summary extends Component {
  render() {
    return (
      <Fragment>
        <Main>
          <Content />
        </Main>
      </Fragment>
    )
  }
}

export default Summary
