import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import CurrencyBadge from './CurrencyBadge'
import {injectIntl} from 'react-intl'

import {Icons, Colors, Loading} from '../common'

const CurrencyBadgeItem = styled('div')`
  & {
    flex: 33% 0 0;
  }
`

const CurrencyContainer = styled('div')`
  & {
    position: relative;
    border: rgba(255, 255, 255, 0.4) 5px solid;
    border-radius: 5px;
    padding: 50px 50px 20px;
    margin-bottom: 50px;
    background: #fff;
    background-clip: padding-box;
    transition: border-color 0.3s ease-in-out;
    @media (max-width: 1024px) {
      padding: 50px 15px 20px;
    }
    @media (max-width: 767px) {
      display: none;
    }
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

const CurrencyBadgeOverflowWrapper = styled('div')`
  & {
    height: 220px;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: scroll;
  }
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
`

const CurrencyBadgeItems = styled('div')`
  & {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }
`

const StyledInput = styled('input')`
  & {
    flex-grow: 1;
    padding: 3px 15px;
    border: none;
    border-bottom: 2px solid #ccc;
    transition: border-bottom-color 0.3s ease-in-out;
  }
  &:active,
  &:focus {
    border-bottom-color: #323232;
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

// Currency drag'n'drop area, contains all currencies and his labels
// Can be dragged to the input
@injectIntl
class CurrencyDNDArea extends Component {
  static propTypes = {
    currency: PropTypes.array.isRequired,
  }

  // save clicked coordiantes at the lable
  state = {
    search: '',
    dragX: 0,
    dragY: 0,
  }

  // Filter currencies
  _handleFilter = ({name, label, icon}) => {
    const regex = new RegExp(this.state.search, 'i')
    return regex.test(name) || regex.test(label) || regex.test(icon)
  }

  // Save coordiantes to the state
  _handleMouseDown = e => {
    const {x, y} = e.currentTarget.getBoundingClientRect()
    this.setState({dragX: e.clientX - x, dragY: e.clientY - y})
  }

  render() {
    const {currency, loading, intl: {formatMessage}} = this.props
    const {dragX, dragY} = this.state
    return (
      <CurrencyContainer>
        <SearchWrap>
          <Icons id="search" />
          <StyledInput
            type="text"
            value={this.state.search}
            onChange={({target}) => this.setState({search: target.value})}
            placeholder={formatMessage({id: 'home.find', defaultMessage: 'Найти'})}
          />
        </SearchWrap>
        {loading && currency.length === 0 ? (
          <Loading size="small" />
        ) : (
          <CurrencyBadgeOverflowWrapper>
            <CurrencyBadgeItems data-testid="dnd-area">
              {currency.filter(this._handleFilter).map(({name, id, icon}, i) => (
                <CurrencyBadgeItem onMouseDown={this._handleMouseDown} key={i}>
                  <CurrencyBadge
                    id={id}
                    icon={icon}
                    name={name}
                    cursorPosition={{dragX, dragY}}
                  />
                </CurrencyBadgeItem>
              ))}
            </CurrencyBadgeItems>
          </CurrencyBadgeOverflowWrapper>
        )}
      </CurrencyContainer>
    )
  }
}

export default CurrencyDNDArea
