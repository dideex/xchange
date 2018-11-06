import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'react-emotion'
import {Table, Column, AutoSizer} from 'react-virtualized'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import PropTypes from 'prop-types'

import {StatusIconColors, StatusTitles} from './Styles'
import Icons from './Icons'

const TableWrap = styled('div')`
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #ffffff;
`

const Status = styled('span')`
  display: block;
  width: 32px;
  height: 32px;
  background: ${({color}) => color};
  border-radius: 50%;
`

// Virtualized component;
@withRouter
export class Virtualized extends Component {
  static propTypes = {
    parsedOrders: PropTypes.array.isRequired,
    endpoint: PropTypes.string.isRequired,
  }
  state = {CopyId: null}

  render() {
    const {parsedOrders, endpoint} = this.props
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
              onRowClick={({rowData: {id}}) =>
                this.props.history.push(`/${endpoint}/${id}`)
              }
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
                        className={this.state.CopyId === cellData ? 'copyied' : ''}
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
