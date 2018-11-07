import React, {Component, Fragment} from 'react'

import Content from '../components/Admin/Settings'
import Main from '../components/Main'
// Settings component;
export class Settings extends Component {
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

export default Settings
