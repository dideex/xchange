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
    this.wallets = {}
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
  changeWallet = currencyLabel => value => {
    this.wallets[currencyLabel] = value
  }

  @action('fetch data')
  fetchData = () => {
    this.username = 'mock user'
    this.email = 'mock email'
    this.wallets = {
      '0': '0234 5678 1234 5678',
      '1': '1765 4321 1234 5678',
      '2': '2765 4321 1234 5678',
      '3': '3765 4321 1234 5678',
    }
    // fetch data from server
  }
}

export const user = new User()
