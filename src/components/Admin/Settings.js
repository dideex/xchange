import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import styled from 'react-emotion'

import Label from './CurrencyBadge'

const Wrap = styled('div')`
  & {
    padding: 0 60px;
  }
`

const CurrencyContainer = styled('div')`
  & {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    div {
      flex: 50% 0 0;
      max-width: 50%;
    }
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
        <CurrencyContainer>
          {currency.map((cur, i) => (
            <Label key={i} token={this.props.userStore.token} data={cur} />
          ))}
        </CurrencyContainer>
      </Wrap>
    )
  }
}

export default Settings
