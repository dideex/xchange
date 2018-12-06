import React, {Fragment} from 'react'

import Converter from '../components/Converter'
import Main from '../components/Main'
import HowTo from '../components/HowTo'
import Bg from '../components/ContainerWithBg'
import LastOperations from '../components/LastOperations'
import Graphic from '../components/Graphic'
import Comments from '../components/Comments'
import Staff from '../components/Staff'

// Home component; Landing page route
export default () => (
  <Fragment>
    <Main>
      <Converter />
    </Main>
    <HowTo />
    <Bg>
      <LastOperations />
      <Graphic />
      <Comments />
    </Bg>
    <Staff />
  </Fragment>
)
