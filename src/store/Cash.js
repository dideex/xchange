import {observable, action} from 'mobx'
import {isNumber} from './common'
import {currency} from '../config/conf'

// menu state
class Cash {
  @observable
  inputValue
  @observable
  outputValue
  @observable
  currencyInput
  @observable
  currencyOutput

  constructor() {
    this.inputValue = 0
    this.outputValue = 0
    this.currency = currency
    this.currencyInput = 0
    this.currencyOutput = 1
  }

  _allowNumberWithDot = num => (num[num.length - 1] !== '.' ? +num : num)

  _calcOutput = value =>
    (value * this.currency[this.currencyInput].price_usd) /
    this.currency[this.currencyOutput].price_usd

  _calcInput = value =>
    (value * this.currency[this.currencyOutput].price_usd) /
    this.currency[this.currencyInput].price_usd

  //FIXME: add limits
  //FIXME: i cant type 0.0 in inputs
  @action('change input')
  changeInput = (value = 0) => {
    if (value === '') value = 0
    if (isNumber(value)) {
      this.inputValue = this._allowNumberWithDot(value)
      this.outputValue = this._calcOutput(value)
    }
  }
  @action('change output')
  changeOutput = (value = 0) => {
    if (value === '') value = 0
    if (isNumber(value)) {
      this.outputValue = this._allowNumberWithDot(value)
      this.inputValue = this._calcInput(value)
    }
  }
  @action('set currency output')
  setCurrencyOutput = (id = 0) => {
    if (this.currencyInput === +id) {
      this.currencyInput = this.currencyOutput
      let temp = this.inputValue
      this.inputValue = this.outputValue
      this.outputValue = temp
      this.currencyOutput = +id
    } else {
      this.currencyOutput = +id
      this.outputValue = this._calcOutput(this.inputValue)
    }
  }
  @action('set currency input')
  setCurrencyInput = (id = 0) => {
    if (this.currencyOutput === +id) {
      this.currencyOutput = this.currencyInput
      let temp = this.inputValue
      this.inputValue = this.outputValue
      this.outputValue = temp
      this.currencyInput = +id
    } else {
      this.currencyInput = +id
      this.inputValue = this._calcInput(this.outputValue)
    }
  }

  // returns true when menu is opened
  // @computed
  // get isOpen() {
  //   return this.state !== 'close'
  // }
}

const cash = new Cash()

export default cash
export {Cash}
