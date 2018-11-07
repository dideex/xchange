import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {Loading} from '../common'

const Wrap = styled('div')`
  & {
    cursor: pointer;
  }
`

// CurrencyBadge component;
class CurrencyBadge extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      loading: false,
      reserve: props.data.reserve,
      source: props.data.source,
      minimal: props.data.minimal,
    }
  }

  state = {
    show: false,
    loading: false,
  }

  _pushSettings = async () => {
    this.setState({loading: true})
    const {reserve, source, minimal} = this.state
    await fetch(`http://localhost:3030/api/setCurrencyOptions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.props.token}`,
      },
      body: JSON.stringify({
        _id: this.props.data._id,
        reserve,
        source,
        minimal,
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
    this.setState({loading: false})
  }

  render() {
    const {data} = this.props
    const {reserve, source, minimal} = this.state
    if (this.state.loading) return <Loading size="small" />
    return (
      <Wrap onClick={() => this.setState(({show}) => ({show: !show}))}>
        {data.name}
        {this.state.show ? (
          <ul onClick={e => e.stopPropagation()}>
            <li>Цена в usd {data.price_usd}</li>
            <li>
              <p>Резервы:</p>
              <input
                type="text"
                value={reserve}
                onChange={e => this.setState({reserve: e.target.value})}
              />
            </li>
            <li>
              <p>Кошелек для перевода:</p>
              <input
                type="text"
                value={source}
                onChange={e => this.setState({source: e.target.value})}
              />
            </li>
            <li>
              <p>Минимальная сумма для перевода:</p>
              <input
                type="text"
                value={minimal}
                onChange={e => this.setState({minimal: e.target.value})}
              />
            </li>
            <button onClick={this._pushSettings}>Сохранить</button>
          </ul>
        ) : null}
      </Wrap>
    )
  }
}

export default CurrencyBadge
