import React, {Component, Fragment} from 'react'

import ReservedContent from '../components/AboutUs'
import Main from '../components/Main'
import Staff from '../components/Staff'

// AboutUs component; Contains information about the company and her benefits
export class AboutUs extends Component {
  render() {
    return (
      <Fragment>
        <Main>
          <ReservedContent />
        </Main>
        <Staff />
      </Fragment>
    )
  }
}

export default AboutUs
