import {observable, action} from 'mobx'

// menu state
export default class User {
  @observable
  username
  @observable
  email
  @observable
  phone
  @observable
  wallets
  @observable
  lastOperations
  @observable
  moneyConverted

  constructor() {
    this.username = ''
    this.email = ''
    this.phone = ''
    this.wallets = []
    this.lastOperations = []
    this.moneyConverted = 0
    this.fetchData()
  }

  @action('change username')
  changeUsername = username => (this.username = username)
  @action('change email')
  changeEmail = email => (this.email = email)
  @action('change phone')
  changePhone = phone => (this.phone = phone)
  @action('change wallet')
  changeWallet = (value, currencyLabel) => (this.wallets[currencyLabel] = value)

  @action('fetch data')
  fetchData = () => {
    this.username = 'mock user'
    this.email = 'mock email'
    this.wallets = {
      Rub: '1234 5678',
      Eu: '8765 4321',
    }
    // fetch data from server
  }
}

export const user = new User()
