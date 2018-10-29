import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'react-emotion'
import {inject, observer} from 'mobx-react'

import {H2} from '../common'
import Signin from './Signin'
import Orders from './Orders'
import Details from './Details'

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
@withRouter
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

  componentDidUpdate() {
    this.wrap.current &&
      window.scrollTo(
        0,
        this.wrap.current.getBoundingClientRect().top + window.pageYOffset - 150,
      )
  }

  /* 
      id,
      inputValue,
      currencyInputLabel,
      walletTo,
      outputValue,
      currencyOutputLabel,
      email,
      username,
      paymentStatus, 
      */

  render() {
    const {token} = this.props.userStore
    const {id} = this.props.match.params
    const {email, username, orders} = this.props.userStore
    const order = id ? orders.find(({_id}) => id === _id) : []
    const data = {email, username, ...order, id}
    if (!token) return <Signin />
    return (
      <div ref={this.wrap}>
        <Wrap>
          <H2>Личный кабинет</H2>
          {id && <Details {...data} />}
          <Orders />
          <SummaryWrap>
            <span>Завершено переводов на общую сумму:</span>
            <strong>{`${this.props.userStore.moneyConverted} руб`}</strong>{' '}
          </SummaryWrap>
        </Wrap>
      </div>
    )
  }
}

export default ContorlPanel
