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
  & {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    div {
      cursor: pointer;
      font-weight: 700;
    }
  }
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
    filter: '',
  }
  //prettier-ignore
  componentWillReceiveProps({ match: { params: {id}}}) {
    if (id !== this.props.match.params.id) this._fetchOrdersDetail(id)
  }

  componentDidMount = async () => {
    if (!this.props.userStore.isAdmin) this.props.history.push('/')
    await this._fetchOrdersByPaymentStatus('all')
    if (this.props.match.params.id) this._fetchOrdersDetail(this.props.match.params.id)
  }

  _fetchOrdersByPaymentStatus = status => {
    this.setState({loading: true, route: status})
    return new Promise((res, rej) =>
      fetch(`http://localhost:3030/api/summaryOrders/${status}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${this.props.userStore.token}`,
        },
      })
        .then(response => response.json())
        .then(orders => this.setState({loading: false, orders}, res))
        .catch(err => {
          console.log(err)
          rej()
        }),
    )
  }

  // FIXME: http://localhost:3000/summary/5bd7ed59b210d44274fb8915 error

  _fetchOrdersDetail = async id => {
    if (!id) return null
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
        orderDetails: {...userDetails, ...orderDetails, id},
        loadingUserData: false,
      })
    } else {
      this.setState({
        orderDetails: {username: 'Guest', ...orderDetails, id},
        loadingUserData: false,
      })
    }
  }

  updatePaymentStatus = async (_id, paymentStatus) => {
    await fetch(`http://localhost:3030/api/summaryOrderChangeStatus`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.props.userStore.token}`,
      },
      body: JSON.stringify({_id, paymentStatus}),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

    this._fetchOrdersByPaymentStatus(this.state.route)
  }

  render() {
    const {orders} = this.state
    const {id} = this.props.match.params
    const parsedOrders = parseOrders(
      orders
        .map(order => ({...order, toWallet: order.fromWallet}))
        .filter(({toWallet}) => ~toWallet.indexOf(this.state.filter)),
    )
    if (this.state.loading) return <Loading size="big" />
    return (
      <Wrap>
        {id && (
          <Details
            updatePaymentStatus={this.updatePaymentStatus}
            loading={this.state.loadingUserData}
            {...this.state.orderDetails}
          />
        )}
        <PaymentSelector>
          <div onClick={() => this._fetchOrdersByPaymentStatus('all')}>Все</div>
          <div onClick={() => this._fetchOrdersByPaymentStatus('created')}>Созданные</div>
          <div onClick={() => this._fetchOrdersByPaymentStatus('expectation')}>
            Подтвержденные
          </div>
          <div onClick={() => this._fetchOrdersByPaymentStatus('closed')}>Закрытые</div>
          <div onClick={() => this._fetchOrdersByPaymentStatus('denied')}>Удаленные</div>
        </PaymentSelector>
        <Virtualized parsedOrders={parsedOrders} endpoint={'summary'} />
        <p>
          Поиск по номеру
          <input type="text" onChange={e => this.setState({filter: e.target.value})} />
        </p>
      </Wrap>
    )
  }
}

export default Admin
