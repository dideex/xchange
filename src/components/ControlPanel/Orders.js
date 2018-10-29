import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import styled from 'react-emotion'
import {Table, Column, AutoSizer} from 'react-virtualized'
import 'react-virtualized/styles.css'

import {Loading, Colors, currencyFormat} from '../common'

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
    .ReactVirtualized__Table__headerColumn:last-child {
      margin-right: 10px;
    }
    .ReactVirtualized__Table__row {
      padding-left: 10px;
      padding-right: 10px !important;
    }
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
  }
`

const TableWrap = styled('div')`
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #ffffff;
`

const ColorMap = ['transparent', '#FC0000', '#FFE712', '#8FBE00']

const Status = styled('span')`
  display: block;
  width: 32px;
  height: 32px;
  background: ${({color}) => color};
  border-radius: 50%;
`

// Orders component;
@inject('userStore')
@observer
class Orders extends Component {
  componentDidMount() {
    this.props.userStore.fetchOrdersByToken()
  }

  render() {
    const {orders, loading} = this.props.userStore
    if (loading) return <Loading />
    const parsedOrders = orders.map(
      ({
        _id,
        created,
        inputValue,
        currencyInputLabel,
        outputValue,
        currencyOutputLabel,
        paymentStatus,
        toWallet,
      }) => {
        const date = new Date(Date.parse(created))
        return {
          id: _id,
          paymentStatus,
          toWallet,
          created: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
          inputValue: `${currencyFormat(inputValue)}, ${currencyInputLabel}`,
          outputValue: `${currencyFormat(outputValue)}, ${currencyOutputLabel}`,
        }
      },
    )
    return (
      <StyledTable>
        <h3>Таблица послдених операций</h3>
        <TableWrap>
          <AutoSizer disableHeight>
            {({width}) => (
              <Table
                width={width}
                height={330}
                headerHeight={20}
                rowHeight={60}
                rowCount={parsedOrders.length}
                rowGetter={({index}) => parsedOrders[index]}
              >
                <Column label="№" dataKey="id" width={100} />
                <Column label="Дата" dataKey="created" width={100} />
                <Column
                  label="Сумма перевода"
                  dataKey="inputValue"
                  width={300}
                  flexGrow={1}
                />
                <Column
                  label="Сумма получения"
                  dataKey="outputValue"
                  width={300}
                  flexGrow={1}
                />
                <Column label="На номер" dataKey="toWallet" width={300} flexGrow={1} />
                <Column
                  label="Статус"
                  dataKey="paymentStatus"
                  width={100}
                  cellRenderer={({cellData}) => <Status color={ColorMap[cellData]} />}
                />
              </Table>
            )}
          </AutoSizer>
        </TableWrap>
      </StyledTable>
    )
  }
}

export default Orders
