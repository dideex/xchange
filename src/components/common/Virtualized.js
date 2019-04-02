import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'react-emotion'
import {Table, Column, AutoSizer} from 'react-virtualized'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {injectIntl} from 'react-intl'
import PropTypes from 'prop-types'
import 'react-virtualized/styles.css'

import {StatusIconColors, StatusTitles} from './Styles'
import Icons from './Icons'
import Colors from './Colors'

const TableWrap = styled('div')`
  & {
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #ffffff;
    @media (max-width: 767px) {
      padding: 10px 0px;
      .ReactVirtualized__Table__rowColumn {
        font-size: 1rem;
        margin-right: 0;
      }
    }
    .ReactVirtualized__Table__row.active {
      background: ${Colors.accent};
    }
  }
`

export const Status = styled('span')`
  display: block;
  width: 32px;
  height: 32px;
  background: ${({color}) => color};
  border-radius: 50%;
  @media (max-width: 767px) {
    width: 16px;
    height: 16px;
  }
`

// Order's table
@withRouter
@injectIntl
export class Virtualized extends Component {
  static propTypes = {
    parsedOrders: PropTypes.array.isRequired,
    endpoint: PropTypes.string.isRequired,
  }
  state = {CopyId: null, selectedId: ''}

  render() {
    const {parsedOrders} = this.props
    const {formatMessage} = this.props.intl
    return (
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
              rowClassName={({index}) =>
                index === this.state.selectedId ? 'active' : ''
              }
              onRowClick={({index, rowData: {id}}) => {
                this.setState({selectedId: index})
                // this.props.history.push(`/${endpoint}/${id}`)
              }}
            >
              <Column
                label="№"
                dataKey="id"
                width={50}
                cellRenderer={({cellData}) => (
                  <CopyToClipboard
                    text={cellData}
                    onCopy={() => this.setState({CopyId: cellData})}
                  >
                    <span title={cellData} onClick={e => e.stopPropagation()}>
                      <Icons
                        id="copy"
                        style={{width: 23}}
                        className={this.state.CopyId === cellData ? 'copyied' : ''}
                      />
                    </span>
                  </CopyToClipboard>
                )}
              />
              <Column
                label={formatMessage({id: 'cp.orders.date', defaultMessage: 'Дата'})}
                dataKey="created"
                width={100}
              />
              <Column
                label={formatMessage({
                  id: 'cp.orders.transferAmount',
                  defaultMessage: 'Сумма перевода',
                })}
                dataKey="inputValue"
                width={300}
                flexGrow={1}
              />
              <Column
                label={formatMessage({
                  id: 'cp.orders.recieveAmount',
                  defaultMessage: 'Сумма получения',
                })}
                dataKey="outputValue"
                width={300}
                flexGrow={1}
              />
              <Column
                label={formatMessage({
                  id: 'cp.orders.toWallet',
                  defaultMessage: 'На номер',
                })}
                dataKey="toWallet"
                width={300}
                flexGrow={1}
              />
              <Column
                label={formatMessage({
                  id: 'home.lastOperations.status',
                  defaultMessage: 'Статус',
                })}
                dataKey="paymentStatus"
                width={100}
                cellRenderer={({cellData}) => (
                  <Status
                    title={StatusTitles[cellData]}
                    color={StatusIconColors[cellData]}
                  />
                )}
              />
            </Table>
          )}
        </AutoSizer>
      </TableWrap>
    )
  }
}

export default Virtualized
