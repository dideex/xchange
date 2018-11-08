import {observable, action, computed} from 'mobx'
import openSocket from 'socket.io-client'

// menu state
class Cash {
  @observable inputValue
  @observable outputValue
  @observable currencyInput
  @observable currencyOutput
  @observable paymentStatus
  @observable draggedBadgeCurrency
  @observable orderId
  @observable loading
  @observable errorMessage
  @observable.ref currency

  constructor() {
    this.inputValue = 0
    this.outputValue = 0
    this.outputValueInUsd = 0
    this.currencyInput = 0
    this.currencyOutput = 2
    this.paymentStatus = 0 // 0 - null, 1 - created, 2 - sended, 3 - closed
    this.draggedBadgeCurrency = null
    this.lessThenMinimal = false
    this.moreThenReseved = false
    this.orderId = null
    this.loading = false
    this.currency = []
    this.errorMessage = ''
    this.socket = openSocket('http://localhost:3040')
    if (this.currency.length === 0) this.fetchCurrency()
  }

  _allowNumberWithDot = num => (num[num.length - 1] !== '.' ? +num : num)

  _calcOutput = value =>
    (value * this.currency[this.currencyInput].price_usd) /
    this.currency[this.currencyOutput].price_usd

  _calcOutputInUsd = () =>
    (this.outputValueInUsd =
      this.outputValue * this.currency[this.currencyOutput].price_usd)

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

  @action('clear message error field')
  clearErr = () => (this.errorMessage = null)

  @action('change input')
  changeInput = (number = 0) => {
    this.clearErr()
    const parsedNumber = this._parseNumber(number)
    if (this._isNumber(parsedNumber)) {
      this.inputValue = parsedNumber
      this.outputValue = this._calcOutput(parsedNumber)
    }
    this._correctValuesLimits()
    this._calcOutputInUsd()
  }
  @action('change output')
  changeOutput = (number = 0) => {
    this.clearErr()
    const parsedNumber = this._parseNumber(number)
    if (this._isNumber(parsedNumber)) {
      this.outputValue = parsedNumber
      this.inputValue = this._calcInput(parsedNumber)
    }
    this._correctValuesLimits()
    this._calcOutputInUsd()
  }
  @action('set currency output')
  setCurrencyOutput = (id = 0) => {
    this.clearErr()
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
    this.clearErr()
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
    this.clearErr()
    this.loading = true
    this._correctValuesLimits()
    this._calcOutputInUsd()
    return this.fetchCurrency().then(async () => {
      this.paymentStatus = 1
      const data = {
        inputValue: this.inputValue,
        outputValue: this.outputValue,
        outputValueInUsd: this.outputValueInUsd,
        currencyInput: this.currency[this.currencyInput].name,
        currencyOutput: this.currency[this.currencyOutput].name,
        currencyInputLabel: this.currency[this.currencyInput].label,
        currencyOutputLabel: this.currency[this.currencyOutput].label,
        paymentStatus: 1,
        fromWallet,
        toWallet,
      }
      if (token)
        await fetch('http://localhost:3030/api/orders', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then(data => {
            const {result, error} = data
            if (!error) {
              this.orderId = result._id
            } else {
              this.errorMessage = error
            }
          })
      else
        await fetch('http://localhost:3030/api/guestOrders', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then(({result}) => (this.orderId = result._id))
      this.loading = false
    })
  }

  @action('get currency from the server')
  fetchCurrency = async () =>
    new Promise((resolve, reject) => {
      this.loading = true
      fetch('http://localhost:3030/api/currency', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          this.currency = data
            .sort((a, b) => a.order - b.order)
            .map((row, i) => ({...row, id: i}))
          this.loading = false
          resolve()
        })
        .catch(err => {
          console.error(err)
          this.loading = false
          reject()
        })
    })

  @action('emit socket')
  emitSocket = data => this.socket.emit('newOrder', data)

  @action('cofirm payment')
  cofirmPayment = email => {
    this.paymentStatus = 2
    fetch('http://localhost:3030/api/confirmOrder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: this.orderId,
        currency: this.currency[this.currencyOutput].icon,
        value: this.outputValue,
      }),
    })
      .then(res => res.json())
      .then(() => {
        this.emitSocket({
          email,
          currency: this.currency[this.currencyOutput].icon,
          inputValue: this.inputValue,
          outputValue: this.outputValue,
          inputLabel: this.currency[this.currencyInput].label,
          outputLabel: this.currency[this.currencyOutput].label,
          paymentStatus: this.paymentStatus,
        })
      })
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
    if (!this.currency.length) return null
    return `${formatter.format(this.currency[this.currencyInput].minimal)} ${
      this.currency[this.currencyInput].label
    }`
  }
  @computed
  get getCurrencyReserve() {
    const formatter = new Intl.NumberFormat('ru', 'currency')
    if (!this.currency.length) return null
    return `${formatter.format(this.currency[this.currencyOutput].reserve)} ${
      this.currency[this.currencyOutput].label
    }`
  }
}

export const cash = new Cash()

export default Cash
