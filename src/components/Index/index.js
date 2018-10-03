import React, {Component, Fragment} from 'react'
import {inject, observer} from 'mobx-react'

// Index component;
@inject('cashStore')
@observer
class Index extends Component {
  render() {
    const {
      input,
      output,
      changeInput,
      changeOutput,
      currency,
      currencyInput,
      currencyOutput,
      changeCurrencyInput,
      changeCurrencyOutput,
    } = this.props.cashStore
    return (
      <Fragment>
        <span>{currency[currencyInput].label}</span>
        <input
          type="text"
          ref={input => (this.input = input)}
          onChange={() => changeInput(this.input.value)}
          value={input}
        />
        <select
          defaultValue={currencyInput}
          name="currencyInput"
          ref={currencyInput => (this.currencyInput = currencyInput)}
          onChange={() => changeCurrencyInput(this.currencyInput.value)}
        >
          {currency.map(
            ({name}, i) =>
              i !== +currencyOutput ? (
                <option value={i} key={i}>
                  {name}
                </option>
              ) : null,
          )}
        </select>
        <span style={{paddingLeft: 200}}>{currency[currencyOutput].label}</span>
        <input
          type="text"
          ref={output => (this.output = output)}
          onChange={() => changeOutput(this.output.value)}
          value={output}
        />
        <select
          defaultValue={currencyOutput}
          name="currencyOutput"
          ref={currencyOutput => (this.currencyOutput = currencyOutput)}
          onChange={() => changeCurrencyOutput(this.currencyOutput.value)}
        >
          {currency.map(
            ({name}, i) =>
              i !== +currencyInput ? (
                <option value={i} key={i}>
                  {name}
                </option>
              ) : null,
          )}
        </select>
      </Fragment>
    )
  }
}

export default Index
