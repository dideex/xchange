import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import styled from 'react-emotion'
import {FormattedMessage} from 'react-intl'

import {Loading, Colors, Virtualized, parseOrders} from '../common'

const StyledTable = styled('div')`
  & {
    h3 {
      text-align: center;
      margin-bottom: 30px;
    }
    .ReactVirtualized__Table__headerRow {
      padding: 50px 10px 30px 10px;
    }
    .ReactVirtualized__Table__headerRow,
    .ReactVirtualized__Grid {
      background-color: #ffffff;
    }
    .ReactVirtualized__Table__headerColumn {
      margin-right: 0;
      border-bottom: 3px solid ${Colors.black};
    }
    .ReactVirtualized__Table__row {
      cursor: pointer;
      padding-left: 10px;
      padding-right: 10px !important;
      @media (max-width: 767px) {
        padding-left: 0;
        & > div:nth-child(1),
        & > div:nth-child(2) {
          display: none;
        }
      }
    }
    .ReactVirtualized__Table__row:focus,
    .ReactVirtualized__Grid:focus {
      outline: none;
    }
    .ReactVirtualized__Grid {
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-button {
        height: 0;
        background-color: transparent;
      }
      &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: ${Colors.accent};
      }
    }
    svg {
      cursor: pointer;
    }
    .copyied {
      path {
        fill: ${Colors.accent}!important;
      }
    }
    @media (max-width: 767px) {
      .ReactVirtualized__Table__headerColumn:first-of-type {
        margin-left: 0;
      }
      .ReactVirtualized__Table__headerColumn:nth-child(1) {
        display: none;
      }
      .ReactVirtualized__Table__headerColumn:nth-child(2) {
        display: none;
      }
    }
  }
`

// Oreder's table
@withRouter
@inject('userStore')
@observer
class Orders extends Component {
  state = {
    CopyId: null,
  }

  componentDidMount() {
    this.props.userStore.fetchOrdersByToken()
  }

  render() {
    const {orders, loading} = this.props.userStore
    if (loading) return <Loading size="small" />
    const parsedOrders = parseOrders(orders)
    return (
      <StyledTable>
        {parsedOrders.length ? (
          <h3>
            <FormattedMessage
              id="cp.orders.tableHeader"
              defaultMessage="Таблица послдених операций"
            />
          </h3>
        ) : null}
        {parsedOrders.length ? (
          <Virtualized parsedOrders={parsedOrders} endpoint="lichnii-kabinet" />
        ) : (
          <h3>
            <FormattedMessage
              id="cp.noOrders"
              defaultMessage="Вы еще не сделали перевода"
            />
          </h3>
        )}
      </StyledTable>
    )
  }
}

export default Orders
