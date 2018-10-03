import {observable, action, computed} from 'mobx'
import {isNumber} from './common'
import {currency} from '../config/conf'

// menu state
class Cash {
  @observable input
  @observable output
  @observable ratio
  @observable currencyInput
  @observable currencyOutput

  constructor() {
    this.input = 0
    this.output = 0
    this.currency = currency
    this.currencyInput = 0
    this.currencyOutput = 1
  }

  _formatNumber = num => num[num.length - 1] !== '.'? +num: num

  //FIXME: add limits
  //FIXME: i cant type 0.0 in inputs
  @action('change input')
  changeInput = (value = 0) => {
    if (value === '') value = 0
    if (isNumber(value)) {
      this.input = this._formatNumber(value)
      this.output = value * this.currency[this.currencyInput].price_usd / this.currency[this.currencyOutput].price_usd
    }
  }
  @action('change output')
  changeOutput = (value = 0) => {
    if (value === '') value = 0
    if (isNumber(value)) {
      this.output = this._formatNumber(value)
      this.input = value * this.currency[this.currencyOutput].price_usd / this.currency[this.currencyInput].price_usd
    }
  }
  @action('change currency output')
  changeCurrencyOutput = (id = 0) => {
    this.currencyOutput = id
  }
  @action('change currency input')
  changeCurrencyInput = (id = 0) => {
    this.currencyInput = id
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
