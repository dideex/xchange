import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import styled from 'react-emotion'

import {Loading, Virtualized, parseOrders} from '../common'
import Details from './Details'

const Wrap = styled('div')`
  & {
    padding: 0 60px;
  }
`

const PaymentSelector = styled('div')`
  display: flex;
  justify-content: space-between;
`

// Admin component;
@withRouter
@inject('userStore')
@observer
class Admin extends Component {
  state = {
    route: 'orders', // orders, settings
    orders: [],
    loadingUserData: false,
    loading: true,
    orderDetails: {},
  }
  //prettier-ignore
  componentWillReceiveProps({ match: { params: {id}}}) {
    console.log(" LOG ___ id ", id )
    if (id !== this.props.match.params.id) this._fetchOrdersDetail(id)
  }

  componentDidMount() {
    if (!this.props.userStore.isAdmin) this.props.history.push('/')
    this._fetchOrdersByPaymentStatus('expectation')
  }

  _fetchOrdersByPaymentStatus = status => {
    this.setState({loading: true})
    fetch(`http://localhost:3030/api/summaryOrders/${status}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.props.userStore.token}`,
      },
    })
      .then(response => response.json())
      .then(orders => this.setState({loading: false, orders}))
      .catch(err => console.log(err))
  }

  _fetchOrdersDetail = async id => {
    const orderDetails = this.state.orders.find(({_id}) => id === _id)
    this.setState({loadingUserData: true})
    if (orderDetails.user !== 'Guest') {
      const userDetails = await fetch(
        `http://localhost:3030/api/summaryOrderUserInfo/${orderDetails.user}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${this.props.userStore.token}`,
          },
        },
      )
        .then(response => response.json())
        .then(userDetails => userDetails)
        .catch(err => {
          console.error(err)
        })
      this.setState({
        orderDetails: {...orderDetails, ...userDetails, id},
        loadingUserData: false,
      })
    } else {
      this.setState({
        orderDetails: {username: 'Guest', ...orderDetails, id},
        loadingUserData: false,
      })
    }
  }

  render() {
    const {orders} = this.state
    const {id} = this.props.match.params
    const parsedOrders = parseOrders(orders)
    if (this.state.loading) return <Loading size="big" />
    return (
      <Wrap>
        {id && (
          <Details loading={this.state.loadingUserData} {...this.state.orderDetails} />
        )}
        <Virtualized parsedOrders={parsedOrders} endpoint={'summary'} />
        <PaymentSelector>
          <div onClick={() => this._fetchOrdersByPaymentStatus('all')}>Все</div>
          <div onClick={() => this._fetchOrdersByPaymentStatus('created')}>Созданные</div>
          <div onClick={() => this._fetchOrdersByPaymentStatus('expectation')}>
            Подтвержденные
          </div>
          <div onClick={() => this._fetchOrdersByPaymentStatus('closed')}>Закрытые</div>
          <div onClick={() => this._fetchOrdersByPaymentStatus('denied')}>Удаленные</div>
        </PaymentSelector>
      </Wrap>
    )
  }
}

export default Admin
