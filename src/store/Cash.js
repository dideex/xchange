import {observable, action, computed} from 'mobx'
import openSocket from 'socket.io-client'
import Api from '../components/Api'
import {noty} from '../components/common'

// Mobx Cash store
// Keeps the current transittion payment data
// And currency rate exchange

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
    this._setInitalData()
  }

  _setInitalData = () => {
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3040'
        : 'http://176.119.158.145:3040'
    this.socket = openSocket.connect(url)
    this.errorEmitter = Api.errorEmitter.bind(this)
    this.fetchCurrency()
  }

  // finds an equal value for input value
  // for 1BTC (with rate 0.9) should be 0.9BTC
  _calcOutput = value =>
    (value * this.currency[this.currencyInput].price_usd * this.userRate) /
    this.currency[this.currencyOutput].price_usd

  // finds an equal value for output value
  // for 1BTC (with rate 0.9) should be 1BTC
  // cur bitc 5448.77817486
  // should be to 0.9 (usd 6054.198)
  _calcInput = value =>
    (value * this.currency[this.currencyOutput].price_usd) /
    (this.currency[this.currencyInput].price_usd * this.userRate)

  // Swaps currencies values when changed currency is already set
  _reverseInputs = () => {
    const temp = this.outputValue / this.userRate
    this.outputValue = this.inputValue * this.userRate
    this.inputValue = temp
  }

  // finds an equal value for output value
  // for 1BTC (wtih rate 0.9) should be 0.9BTC
  _calcOutputWithoutRates = value =>
    (value * this.currency[this.currencyInput].price_usd * this.userRate) /
    this.currency[this.currencyOutput].price_usd

  // finds an equal value for input value
  // for 1BTC (wtih rate 0.9) should be 0.9BTC
  _calcInputWithoutRates = value =>
    (value * this.currency[this.currencyOutput].price_usd) /
    (this.currency[this.currencyInput].price_usd * this.userRate)

  // It holds total amount in common unit for userprofile
  _calcOutputInUsd = () =>
    (this.outputValueInUsd =
      this.outputValue * this.currency[this.currencyOutput].price_usd)

  // check for a correct number
  _isNumber = num => /^\d+[.]?\d{0,3}$/.test(num)

  // It returns true when input's currencies are equals
  _isSameCurrencyLabel = (id1, id2) =>
    this.currency[id1].label === this.currency[id2].label

  // Parses nubmer for "0,2" to "0.2", and " 0,2  " to "0.2"
  _parseNumber = num => {
    if (num === '') return 0
    else {
      num = num.replace(/\s/g, '')
      num = num.replace(',', '.')
    }
    return num
  }

  // It recalculates both input to correct range
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

  // Change and validate input, and recalculate output value
  @action('change input')
  changeInput = (number = 0) => {
    this.clearErr()
    const parsedNumber = this._parseNumber(number)
    if (this._isNumber(parsedNumber)) {
      this.inputValue = parsedNumber
      this.outputValue = this._calcOutput(parsedNumber)
    }
    this._calcOutputInUsd()
  }

  // Change and validate output, and recalculate input value
  @action('change output')
  changeOutput = (number = 0) => {
    this.clearErr()
    const parsedNumber = this._parseNumber(number)
    if (this._isNumber(parsedNumber)) {
      this.outputValue = parsedNumber
      this.inputValue = this._calcInput(parsedNumber)
    }
    this._calcOutputInUsd()
  }

  // Change output value, or switch it with input currency when are the same
  @action('set currency output')
  setCurrencyOutput = (id = 0) => {
    this.clearErr()
    if (this.currencyOutput === +id) return null
    if (this._isSameCurrencyLabel(id, this.currencyInput)) {
      this.currencyInput = this.currencyOutput
      this.currencyOutput = +id
      this._reverseInputs()
    } else {
      this.currencyOutput = +id
      this.outputValue = this._calcOutputWithoutRates(this.inputValue)
    }
  }

  // Change output value, or switch it with input currency when are the same
  @action('set currency input')
  setCurrencyInput = (id = 0) => {
    this.clearErr()
    if (this.currencyInput === +id) return null
    if (this._isSameCurrencyLabel(id, this.currencyOutput)) {
      this.currencyOutput = this.currencyInput
      this.currencyInput = +id
      this._reverseInputs()
    } else {
      this.currencyInput = +id
      this.inputValue = this._calcInputWithoutRates(this.outputValue)
    }
  }

  /**
   * Creates payment
   * Refetch currency rate exchanges
   * When token is not undefiended, creates protected order, otherwise creates public
   * @param {token: {String}, fromWallet: {String}, toWallet: {String}, email: {String}}{Object}
   * @return <Promise>
   * @public
   */
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

  /**
   * Fetch currency data and currency rate exchange from the server
   * Sorting result currencies
   * Replace id to number instead a name
   * @return <Promise>
   * @public
   */
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

  /**
   * Creates boadcast query to socketio
   * @param {emailinputValue{String} outputValue{Sting|Number} inputLabel{String|Number} outputLabel{String} currency{String} paymentStatus{Number}}<data>
   * @public
   */
  @action('emit socket')
  emitSocket = data => this.socket.emit('newOrder', data)

  /**
   * Creates POST query to the server which means change a payment status for orderd to 2(order transmitted)
   * @param email{Sting}
   * @public
   */
  @action('confirm payment')
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

  // helper for react-dnd, memoize the id which was dragged
  @action('drag badge')
  handleDragBadge = id => (this.draggedBadgeCurrency = id)

  // return formatted string with input value and their currency label is
  @computed
  get getInput() {
    return `${this.inputValue}, ${this.currency[this.currencyInput].label.toUpperCase()}`
  }
  // return formatted string with output value and their currency label is
  @computed
  get getOutput() {
    return `${this.outputValue}, ${this.currency[
      this.currencyOutput
    ].label.toUpperCase()}`
  }
  //returns formatted minimal amount for input value is
  @computed
  get getMinimalAmount() {
    const formatter = new Intl.NumberFormat('ru', 'currency')
    if (!this.currency.length) return null
    return `${formatter.format(this.currency[this.currencyInput].minimal)} ${
      this.currency[this.currencyInput].label
    }`
  }
  //returns formatted reserved amount for output value is
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
