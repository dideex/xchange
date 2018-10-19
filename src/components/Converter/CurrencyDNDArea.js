import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import CurrencyBadge from './CurrencyBadge'

import {Icons} from '../common'

const CurrencyBadgeItem = styled('div')`
  & {
    flex: 33% 0 0;
  }
`
// FIXME: Cannot have two HTML5 backends at the same time.

const CurrencyBadgeItems = styled('div')`
  & {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    border: rgba(255, 255, 255, 0.4) 5px solid;
    border-radius: 5px;
    padding: 50px 15px 8px;
    margin-bottom: 50px;
    background: #fff;
    background-clip: padding-box;
    transition: border-color 0.3s ease-in-out;
    min-height: ${({height}) => height}px;
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

const StyledInput = styled('input')`
  & {
    flex-grow: 1;
    padding: 3px 15px;
    border: none;
    border-bottom: 1px solid #ccc;
    transition: border-bottom-color 0.3s ease-in-out;
  }
  &:active,
  &:focus {
    border-bottom-color: #000;
  }
`
const SearchWrap = styled('div')`
  & {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 280px;
    left: 0;
    right: 0;
    top: 10px;
    margin: 0 auto;
    svg {
      margin-right: 10px;
      width: 25px;
    }
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

  _handleFilter = ({name, label}) => {
    const regex = new RegExp(this.state.search, 'i')
    return regex.test(name) || regex.test(label)
  }

  render() {
    const {currency} = this.props
    return (
      <CurrencyBadgeItems height={68 + 55 * (Math.round(currency.length % 3) + 1)}>
        <SearchWrap>
          <Icons id="search" />
          <StyledInput
            type="text"
            value={this.state.search}
            onChange={({target}) => this.setState({search: target.value})}
            placeholder="Найти"
          />
        </SearchWrap>
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
