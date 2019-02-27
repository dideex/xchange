import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import styled from 'react-emotion'

import {
  Loading,
  Virtualized,
  parseOrders,
  noty,
  StatusTitles,
  MainSectionWrap,
} from '../common'
import Api from '../Api'
import Details from './Details'

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

// Admin component; Root component
@withRouter
@inject('cashStore')
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
    if (id !== this.props.match.params.id) this._fetchOrderDetail(id)
  }

  componentDidMount = async () => {
    if (!this.props.userStore.isAdmin) this.props.history.push('/')
    // set default payment order to 'all'
    await this._fetchOrdersByPaymentStatus('all')
    if (this.props.match.params.id) this._fetchOrderDetail(this.props.match.params.id)
  }

  // Sort orders by payment status
  // 'All' includes all except 'removed'
  _fetchOrdersByPaymentStatus = status => {
    this.setState({loading: true, route: status})
    // getting data
    return new Promise((res, rej) =>
      Api.get('summaryOrders', `/${status}`, this.props.userStore.token)
        .then(
          Api.errorEmitter(orders => //console.log(orders)
            // save orders to state
            this.setState({loading: false, orders: Object.values(orders)}, res),
          ),
        )
        .catch(err => {
          console.error(err)
          noty(err, 'error')
          rej()
        }),
    )
  }

  // Getting additional data on the order
  _fetchOrderDetail = async id => {
    if (!id) return null
    // find the order by id
    const orderDetails = this.state.orders.find(({_id}) => id === _id)
    this.setState({loadingUserData: true})
    if (orderDetails && orderDetails.user !== 'Guest') {
      // getting user's data
      const userDetails = await Api.get(
        'summaryOrderUserInfo',
        `/${orderDetails.user}`,
        this.props.userStore.token,
      )
        .then(userDetails => userDetails)
        .catch(err => {
          console.error(err)
          noty(err, 'error')
        })
      // set user's order
      this.setState({
        orderDetails: {...userDetails, ...orderDetails, id},
        loadingUserData: false,
      })
    } else {
      // set guest's order
      this.setState({
        orderDetails: {username: 'Guest', ...orderDetails, id},
        loadingUserData: false,
      })
    }
  }

  // Change payment status
  updatePaymentStatus = async (_id, paymentStatus) => {
    // getting data
    await Api.post(
      'summaryOrderChangeStatus',
      {_id, paymentStatus},
      this.props.userStore.token,
    )
      .then(
        ({
          email,
          currencyOutputLabel,
          currencyInputLabel,
          inputValue,
          outputValue,
          currencyOutput,
        }) => {
          const currency = this.props.cashStore.currency.find(
            ({name}) => name === currencyOutput,
          ).icon
          noty(`Статус изменен на ${StatusTitles[paymentStatus]}`)
          if (paymentStatus === 3)
            // send data to broadcast through web-socket
            this.props.cashStore.emitSocket({
              email,
              inputValue,
              outputValue,
              inputLabel: currencyInputLabel,
              outputLabel: currencyOutputLabel,
              currency,
              paymentStatus: 3,
            })
        },
      )
      .catch(err => {
        console.error(err)
        noty(err, 'error')
      })

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
      <MainSectionWrap>
        {/* id && (
          <Details
            updatePaymentStatus={this.updatePaymentStatus}
            loading={this.state.loadingUserData}
            {...this.state.orderDetails}
          />
        ) */}
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
          <input
            type="text"
            onChange={({target: {value}}) => this.setState({filter: value})}
          />
        </p>
      </MainSectionWrap>
    )
  }
}

export default Admin
