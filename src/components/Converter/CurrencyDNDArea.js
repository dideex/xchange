import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import CurrencyBadge from './CurrencyBadge'

const CurrencyBadgeItem = styled('div')`
  & {
    flex: 33% 0 0;
  }
`
// FIXME: Cannot have two HTML5 backends at the same time.

const CurrencyBadgeItems = styled('div')`
  & {
    display: flex;
    flex-wrap: wrap;
    border: rgba(255, 255, 255, 0.4) 5px solid;
    border-radius: 5px;
    padding: 8px 15px;
    background: #fff;
    background-clip: padding-box;
    transition: border-color 0.3s ease-in-out;
  }
  &:hover {
    border-color: rgba(255, 255, 255, 0.7);
  }
  &:focus,
  &:active {
    outline: none;
    border-color: #fff;
  }
`

// CurrencyDNDArea component;
class CurrencyDNDArea extends Component {
  static propTypes = {
    currency: PropTypes.array.isRequired,
  }

  state = {
    search: '',
  }

  _handleFilter = ({name}) => {
    const regex = new RegExp(this.state.search, 'i')
    return regex.test(name)
  }

  render() {
    const {currency} = this.props
    return (
      <CurrencyBadgeItems>
        <input
          type="text"
          value={this.state.search}
          onChange={({target}) => this.setState({search: target.value})}
        />
        {currency.filter(this._handleFilter).map(({name, id}, i) => (
          <CurrencyBadgeItem key={i}>
            <CurrencyBadge id={id} name={name} />
          </CurrencyBadgeItem>
        ))}
      </CurrencyBadgeItems>
    )
  }
}

export default CurrencyDNDArea
