import React, {Component, Fragment} from 'react'
import {inject, observer} from 'mobx-react'

// Index component;
@inject('cashStore')
@observer
class Index extends Component {
  state = {
    inputValue: 0,
  }
  handleChange = e => {
    console.log(this.input.value)
    this.props.cashStore.changeInput(100)
  }
  render() {
    const {input: inputValue, output, changeInput, changeOutput} = this.props.cashStore
    return (
      <Fragment>
        <input
          type="text"
          ref={input => (this.input = input)}
          onChange={() => changeInput(this.input.value)}
          value={inputValue}
        />
        <input
          type="text"
          ref={output => (this.output = output)}
          onChange={() => changeOutput(this.output.value)}
          value={output}
        />
      </Fragment>
    )
  }
}

export default Index
