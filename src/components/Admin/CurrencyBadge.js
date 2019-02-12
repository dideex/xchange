import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import Api from '../Api'
import {Loading, noty} from '../common'

const Wrap = styled('div')`
  & {
    cursor: pointer;
  }
`

// CurrencyBadge component; Inputs for settings page, contains writable data for currency
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

  // Push data to the server
  _pushSettings = async () => {
    this.setState({loading: false})
    const {reserve, source, minimal} = this.state
    const data = {
      _id: this.props.data._id,
      reserve,
      source,
      minimal,
    }
    await Api.post('setCurrencyOptions', data, this.props.token)
      .then(Api.errorEmitter(() => noty('Сохранено')))
      .catch(err => {
        console.error(err)
        noty(err, 'error')
      })
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
                name="reserved"
                type="text"
                value={reserve}
                onChange={e => this.setState({reserve: e.target.value})}
              />
            </li>
            <li>
              <p>Кошелек для перевода:</p>
              <input
                name="source"
                type="text"
                value={source}
                onChange={e => this.setState({source: e.target.value})}
              />
            </li>
            <li>
              <p>Минимальная сумма для перевода:</p>
              <input
                name="minimal"
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
