import React, {Component} from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import Label from '../../common/Label'

const Wrapper = styled('div')`
  position: relative;
  background-color: transparent;
`

const SelectBlock = styled('div')`
  & {
    position: absolute;
    top: 100%;
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

// CurrencySelect component;
class CurrencySelect extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    currency: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
  }

  state = {
    open: false,
  }

  _handleSelect = id => {
    this.setState({open: true})
    this.props.handleChange(id)
  }

  _getSelectionField = () => (
    <SelectBlock onMouseLeave={() => this.setState({open: false})}>
      {this.props.currency.map(({name, id}, i) => (
        <Label key={i} onClick={this._handleSelect.bind(null, id)} caption={name} />
      ))}
    </SelectBlock>
  )

  render() {
    // const {id, currency, handleChange} = this.props
    // <select name="id" onChange={({target}) => handleChange(target.value)} value={id}>
    //   {currency.map(({name, id: _id}, i) => (
    //     <option value={_id} key={i}>
    //       {name}
    //     </option>
    //   ))}
    // </select>
    return (
      <Wrapper onClick={() => this.setState({open: true})}>
        >{this.state.open && this._getSelectionField()}
      </Wrapper>
    )
  }
}

export default CurrencySelect
