import React, {Component} from 'react'
import styled from 'react-emotion'
import {inject, observer} from 'mobx-react'

import {H2} from '../common'
import Signin from './Signin'

const Wrap = styled('div')`
  & {
    padding: 0 60px;
  }
`

// ContorlPanel component;
@inject('userStore')
@observer
class ContorlPanel extends Component {
  render() {
    const {token} = this.props.userStore
    if (!token) return <Signin />
    return (
      <Wrap>
        <H2>Личный кабинет</H2>
      </Wrap>
    )
  }
}

export default ContorlPanel
