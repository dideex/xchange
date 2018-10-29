import React, {Component} from 'react'
import styled from 'react-emotion'
import {inject, observer} from 'mobx-react'

import {H2} from '../common'
import Signin from './Signin'
import Orders from './Orders'

const Wrap = styled('div')`
  & {
    padding: 0 60px;
  }
`

const SummaryWrap = styled('p')`
  padding: 50px;
  display: flex;
  justify-content: space-between;
`

// ContorlPanel component;
@inject('userStore')
@observer
class ContorlPanel extends Component {
  constructor(props) {
    super(props)
    this.wrap = React.createRef()
  }
  componentDidMount() {
    this.wrap.current &&
      window.scrollTo(
        0,
        this.wrap.current.getBoundingClientRect().top + window.pageYOffset - 150,
      )
  }

  render() {
    const {token} = this.props.userStore
    if (!token) return <Signin />
    return (
      <div ref={this.wrap}>
        <Wrap>
          <H2>Личный кабинет</H2>
          <Orders />
          <SummaryWrap><span>Завершено переводов на общую сумму:</span>
          <strong>{`${this.props.userStore.moneyConverted} руб`}</strong> </SummaryWrap>
        </Wrap>
      </div>
    )
  }
}

export default ContorlPanel
