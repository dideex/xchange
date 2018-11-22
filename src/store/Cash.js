import {observable, action, computed} from 'mobx'
import openSocket from 'socket.io-client'
import Api from '../components/Api'
import {noty} from '../components/common'

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
  @observable isNetworkError
  @observable.ref currency

  constructor() {
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3040'
        : 'http://176.119.158.145:3040'
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
    this.isNetworkError = false
    this.userRate = 0.9
    this.socket = openSocket(url)
    this.errorEmitter = Api.errorEmitter.bind(this)
    this.fetchCurrency()
  }

  _allowNumberWithDot = num => (num[num.length - 1] !== '.' ? +num : num)

  _calcOutput = value =>
    (value * this.currency[this.currencyInput].price_usd * this.userRate) /
    this.currency[this.currencyOutput].price_usd

  _calcInput = value =>
    (value * this.currency[this.currencyOutput].price_usd) /
    this.currency[this.currencyInput].price_usd

  _calcOutputWithoutRates = value =>
    (value * this.currency[this.currencyInput].price_usd * this.userRate) /
    this.currency[this.currencyOutput].price_usd

  _calcInputWithoutRates = value =>
    (value * this.currency[this.currencyOutput].price_usd) /
    this.currency[this.currencyInput].price_usd

  _calcOutputInUsd = () =>
    (this.outputValueInUsd =
      this.outputValue * this.currency[this.currencyOutput].price_usd)

  _isNumber = num => /^\d+[.]?\d{0,3}$/.test(num)

  _isSameCurrencyLabel = (id1, id2) =>
    this.currency[id1].label === this.currency[id2].label

  _parseNumber = num => {
    if (num === '') return 0
    else {
      num = num.replace(/\s/g, '')
      num = num.replace(',', '.')
    }
    return num
  }

  @action('Verify values posible limit')
  correctValuesLimits = () => {
    const {minimal} = this.currency[this.currencyInput]
    const {reserve} = this.currency[this.currencyOutput]
    if (this.inputValue < +minimal) {
      this.inputValue = minimal
      this.outputValue = this._calcOutput(minimal)
    }
    if (this.outputValue * this.userRate > +reserve) {
      this.outputValue = reserve
      this.inputValue = this._calcInput(reserve)
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
    // this.correctValuesLimits()
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
    // this.correctValuesLimits()
    this._calcOutputInUsd()
  }

  @action('set currency output')
  setCurrencyOutput = (id = 0) => {
    this.clearErr()
    if (this.currencyOutput === +id) return null
    if (this._isSameCurrencyLabel(id, this.currencyInput)) {
      this.currencyInput = this.currencyOutput
      this.currencyOutput = +id
      let temp = this.inputValue
      this.inputValue = this.outputValue / this.userRate //** 2
      this.outputValue = +temp
    } else {
      this.currencyOutput = +id
      this.outputValue = this._calcOutputWithoutRates(this.inputValue)
    }
  }

  @action('set currency input')
  setCurrencyInput = (id = 0) => {
    this.clearErr()
    if (this.currencyInput === +id) return null
    if (this._isSameCurrencyLabel(id, this.currencyOutput)) {
      this.currencyOutput = this.currencyInput
      this.currencyInput = +id
      let temp = this.inputValue
      this.inputValue = this.outputValue
      this.outputValue = +temp * this.userRate //** 2
    } else {
      this.currencyInput = +id
      this.inputValue = this._calcInputWithoutRates(this.outputValue)
    }
  }

  @action('create payment and push to server')
  createPayment = ({token, fromWallet, toWallet, email}) => {
    this.clearErr()
    this.isNetworkError = false
    this.loading = true
    this.correctValuesLimits()
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
        email,
        fromWallet,
        toWallet,
        token,
      }
      if (token)
        await Api.post('orders', data, token)
          .then(
            this.errorEmitter(({result}) => {
              this.orderId = result._id
              noty('Ваш перевод успешно создан')
            }),
          )
          .catch(err => {
            console.error(err)
            this.isNetworkError = true
            noty('Ошибка создания', 'error')
          })
      else
        await Api.post('guestOrders', data)
          .then(
            this.errorEmitter(({result}) => {
              this.orderId = result._id
              noty('Ваш перевод успешно создан')
            }),
          )
          .catch(err => {
            console.error(err)
            this.isNetworkError = true
            noty('Ошибка создания', 'error')
          })
      this.loading = false
    })
  }

  @action('get currency from the server')
  fetchCurrency = () =>
    new Promise((resolve, reject) => {
      this.loading = true
      return Api.get('currency')
        .then(
          this.errorEmitter(({data, userRate}) => {
            this.userRate = userRate
            this.currency = Object.values(data)
              .sort((a, b) => a.order - b.order)
              .map((row, i) => ({...row, id: i}))
            this.loading = false
            resolve()
          }),
        )
        .catch(err => {
          noty('Ошибка сервера', 'error')
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
    const data = {
      _id: this.orderId,
      currency: this.currency[this.currencyOutput].icon,
      value: this.outputValue,
      email,
    }
    Api.post('confirmOrder', data)
      .then(
        this.errorEmitter(() => {
          noty('Ваш перевод передан на обработку')
          this.emitSocket({
            email,
            currency: this.currency[this.currencyOutput].icon,
            inputValue: this.inputValue,
            outputValue: this.outputValue,
            inputLabel: this.currency[this.currencyInput].label,
            outputLabel: this.currency[this.currencyOutput].label,
            paymentStatus: this.paymentStatus,
          })
        }),
      )
      .catch(err => {
        console.error(err)
        noty('Ошибка перевода', 'error')
      })
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
