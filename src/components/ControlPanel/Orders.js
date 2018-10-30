import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import { withRouter } from 'react-router-dom';
import styled from 'react-emotion'
import {Table, Column, AutoSizer} from 'react-virtualized'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import 'react-virtualized/styles.css'

import {Loading, Colors, currencyFormat, Icons} from '../common'

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
      cursor: pointer;
      padding-left: 10px;
      padding-right: 10px !important;
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
  }
`

const TableWrap = styled('div')`
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #ffffff;
`

const ColorMap = ['transparent', '#FC0000', '#FFE712', '#8FBE00']
const StatusMap = ['Не создан', 'Ожидает перевода', 'Ожидает подтверждения', 'Переведено']

const Status = styled('span')`
  display: block;
  width: 32px;
  height: 32px;
  background: ${({color}) => color};
  border-radius: 50%;
`

// Orders component;
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
                onRowClick={({rowData: {id}}) => this.props.history.push(`/lichnii-kabinet/${id}`)}
              >
                <Column
                  label="№"
                  dataKey="id"
                  width={100}
                  cellRenderer={({cellData}) => (
                    <CopyToClipboard
                      text={cellData}
                      onCopy={() => this.setState({CopyId: cellData})}
                    >
                      <span title={cellData} onClick={e => e.stopPropagation()}>
                        <Icons
                          id="copy"
                          style={{width: 23}}
                          className={this.state.CopyId === cellData && 'copyied'}
                        />
                      </span>
                    </CopyToClipboard>
                  )}
                />
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
                  cellRenderer={({cellData}) => (
                    <Status title={StatusMap[cellData]} color={ColorMap[cellData]} />
                  )}
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
