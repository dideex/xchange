import {observable, action, computed} from 'mobx'
import {isNumber} from './common'

// menu state
class Cash {
  @observable input
  @observable output
  @observable ratio

  constructor() {
    this.input = 10
    this.ratio = 0.5
    this.output = this.input * this.ratio
  }

  @action('change input')
  changeInput = (value = 0) => {
    if (value === '') value = 0
    if (isNumber(value)) {
      this.input = +value
      this.output = value / this.ratio
    }
  }
  @action('change output')
  changeOutput = (value = 0) => {
    if (value === '') value = 0
    if (isNumber(value)) {
      this.output = +value
      this.input = value * this.ratio
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
