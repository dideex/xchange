import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import styled from 'react-emotion'
import {withRouter} from 'react-router-dom'

import {currencyFormat, statusArray, Loading} from '../common'

const Wrap = styled('div')`
  & {
    padding: 0 60px;
  }
  & button {
    width: 37%;
    display: block;
    margin: 50px auto 0;
  }
  & svg {
    width: 30%;
    display: block;
    margin: 50px auto 30px;
  }
  & h3 {
    text-align: center;
    margin-bottom: 30px;
  }
`

const Details = styled('div')`
  & {
    display: flex;
    justify-content: space-between;
  }
  & > * {
    flex: 40% 0 0;
  }
  & span,
  & strong {
    white-space: nowrap;
  }
`

const UserInfo = styled('div')`
  & {
    max-width: 37%;
    margin: 50px auto;
  }
  & p {
    display: flex;
    justify-content: space-between;
  }
`
// DetailsComponent component;
@withRouter
@inject('userStore')
@observer
class DetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.id = props.match.params.id
    this.state = {}
  }

  componentDidMount() {
    this.props.userStore
      .fetchGuestOrder(this.id)
      .then(data => this.setState(data))
  }

  render() {
    if(this.props.userStore.loading) return <Loading />
    const {
      inputValue,
      currencyInputLabel,
      toWallet,
      outputValue,
      currencyOutputLabel,
      paymentStatus,
    } = this.state
    return (
      <Wrap>
        <h3>Перевод № {this.id}</h3>
        <Details>
          <div>
            <Details>
              <span>Кошелек для перевода:</span>
              <strong>1234 4321 1234 5643</strong>
            </Details>
            <Details>
              <span>Сумму для перевода:</span>
              <strong>{`${currencyFormat(inputValue)} ${currencyInputLabel}`}</strong>
            </Details>
          </div>
          <div>
            <Details>
              <span>Получить на кошелек:</span>
              <strong>{toWallet}</strong>
            </Details>
            <Details>
              <span>Сумму получения:</span>
              <strong>{`${currencyFormat(outputValue)} ${currencyOutputLabel}`}</strong>
            </Details>
          </div>
        </Details>
        <UserInfo>
          <p>
            <span>Статус:</span>
            <strong>{statusArray[paymentStatus]}</strong>
          </p>
        </UserInfo>
      </Wrap>
    )
  }
}

export default DetailsComponent
