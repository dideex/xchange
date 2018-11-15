import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'react-emotion'
import {inject, observer} from 'mobx-react'
import {FormattedMessage} from 'react-intl'

import {H2, ScrollTo, MainSectionWrap} from '../common'
import Signin from './Signin'
import Orders from './Orders'
import Details from './Details'

const SummaryWrap = styled('p')`
  padding: 50px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    padding: 50px 0;
  }
`

// ContorlPanel component;
@withRouter
@inject('userStore')
@inject('cashStore')
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
    this.wrap.current && ScrollTo(this.wrap.current.getBoundingClientRect().top - 150)
  }

  render() {
    const {currency} = this.props.cashStore
    const {token} = this.props.userStore
    const {id} = this.props.match.params
    const {email, username, orders} = this.props.userStore
    const order = id ? orders.find(({_id}) => id === _id) : []
    const sourceWallet = currency.find(({name}) => name === order.currencyInput)
    const data = {
      email,
      username,
      ...order,
      id,
      sourceWallet: sourceWallet && sourceWallet.source,
    }
    if (!token) return <Signin />
    return (
      <div ref={this.wrap}>
        <MainSectionWrap>
          <H2>
            <FormattedMessage id="cp.header" defaultMessage="Личный кабинет" />
          </H2>
          {id && <Details {...data} />}
          <Orders />
          <SummaryWrap>
            <span>
              <FormattedMessage
                id="cp.totalAmount"
                deafultMessage="Завершено переводов на общую сумму:"
              />
            </span>
            <strong>{`${this.props.userStore.convertedAmount} usd`}</strong>
          </SummaryWrap>
        </MainSectionWrap>
      </div>
    )
  }
}

export default ContorlPanel
