import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import styled from 'react-emotion'

import Label from './CurrencyBadge'
import {Loading} from '../common'

const Wrap = styled('div')`
  & {
    padding: 0 60px;
  }
`

// Settings component;
@inject('userStore')
@inject('cashStore')
@observer
class Settings extends Component {
  static propTypes = {}

  render() {
    const {currency} = this.props.cashStore
    return (
      <Wrap>
        <ul>
          {currency.map((cur, i) => (
            <Label key={i} token={this.props.userStore.token} data={cur} />
          ))}
        </ul>
      </Wrap>
    )
  }
}

export default Settings
