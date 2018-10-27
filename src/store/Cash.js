import {observable, action, computed} from 'mobx'
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
  @observable
  paymentStatus
  @observable
  draggedBadgeCurrency
  @observable
  orderId

  constructor() {
    this.inputValue = 0
    this.outputValue = 0
    this.currency = currency
    this.currencyInput = 0
    this.currencyOutput = 3
    this.paymentStatus = 0 // 0 - null, 1 - created, 2 - sended, 3 - closed
    this.draggedBadgeCurrency = null
    this.lessThenMinimal = false
    this.moreThenReseved = false
    this.orderId = null
  }

  _allowNumberWithDot = num => (num[num.length - 1] !== '.' ? +num : num)

  _calcOutput = value =>
    (value * this.currency[this.currencyInput].price_usd) /
    this.currency[this.currencyOutput].price_usd

  _isNumber = num => /^\d+[.]?\d{0,3}$/.test(num)

  _parseNumber = num => {
    if (num === '') num = 0
    else {
      num = num.replace(/\s/g, '')
      num = num.replace(',', '.')
    }
    return num
  }

  _calcInput = value =>
    (value * this.currency[this.currencyOutput].price_usd) /
    this.currency[this.currencyInput].price_usd

  _correctValuesLimits = () => {
    const {minimal} = this.currency[this.currencyInput]
    const {reserve} = this.currency[this.currencyOutput]
    if (this.inputValue < minimal) {
      this.lessThenMinimal = true
      this.inputValue = minimal
      this.outputValue = this._calcOutput(minimal)
    }
    if (this.outputValue > reserve) {
      this.moreThenReseved = true
      this.outputValue = reserve
      this.inputValue = this._calcInput(reserve)
    }
    if (this.inputValue >= minimal && this.outputValue <= reserve) {
      this.lessThenMinimal = false
      this.moreThenReseved = false
    }
  }

  @action('change input')
  changeInput = (number = 0) => {
    const parsedNumber = this._parseNumber(number)
    if (this._isNumber(parsedNumber)) {
      this.inputValue = parsedNumber
      this.outputValue = this._calcOutput(parsedNumber)
    }
    this._correctValuesLimits()
  }
  @action('change output')
  changeOutput = (number = 0) => {
    const parsedNumber = this._parseNumber(number)
    if (this._isNumber(parsedNumber)) {
      this.outputValue = parsedNumber
      this.inputValue = this._calcInput(parsedNumber)
    }
    this._correctValuesLimits()
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
  @action('create payment and push to server')
  createPayment = ({token, fromWallet, toWallet}) => {
    this._correctValuesLimits()
    this.paymentStatus = 1
    const data = {
      inputValue: this.inputValue,
      outputValue: this.outputValue,
      currencyInput: this.currencyInput,
      currencyOutput: this.currencyOutput,
      paymentStatus: 1,
      fromWallet,
      toWallet,
    }
    if (token)
      fetch('http://localhost:3030/api/orders', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({...data}),
      })
        .then(res => res.json())
        .then(({result}) => (this.orderId = result._id))
        .catch(err => console.error(err))
    else
      fetch('http://localhost:3030/api/guestOrders', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data}),
      })
        .then(res => res.json())
        .then(({result}) => (this.orderId = result._id))
        .catch(err => console.error(err))
  }

  @action('cofirm payment')
  cofirmPayment = () => {
    this.paymentStatus = 2
    fetch('http://localhost:3030/api/confirmOrder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({_id: this.orderId}),
    })
      .then(res => res.json())
      .then(({result}) => console.log(result))
      .catch(err => console.error(err))
  }
  @action('drag badge')
  handleDragBadge = id => (this.draggedBadgeCurrency = id)

  // returns true when menu is opened
  @computed
  get getInput() {
    return `${this.inputValue}, ${this.currency[this.currencyInput].label.toUpperCase()}`
  }
  @computed
  get getOutput() {
    return `${this.outputValue}, ${this.currency[
      this.currencyOutput
    ].label.toUpperCase()}`
  }
  @computed
  get getMinimalAmount() {
    const formatter = new Intl.NumberFormat('ru', 'currency')
    return `${formatter.format(this.currency[this.currencyInput].minimal)} ${
      this.currency[this.currencyInput].label
    }`
  }
  @computed
  get getCurrencyReserve() {
    const formatter = new Intl.NumberFormat('ru', 'currency')
    return `${formatter.format(this.currency[this.currencyOutput].reserve)} ${
      this.currency[this.currencyOutput].label
    }`
  }
}

export const cash = new Cash()

export default Cash
