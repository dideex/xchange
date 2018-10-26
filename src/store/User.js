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
  @observable
  loading
  @observable
  token

  constructor() {
    this.username = ''
    this.password = ''
    this.email = ''
    this.phone = ''
    this.wallets = {}
    this.lastOperations = []
    this.moneyConverted = 0
    this.loading = false
    this.token = 0
    this.fetchData()
  }

  @action('change username')
  changeUsername = username => (this.username = username)
  @action('change password')
  changePassword = password => (this.password = password)
  @action('change email')
  changeEmail = email => (this.email = email)
  @action('change phone')
  changePhone = phone => (this.phone = phone)
  @action('change wallet')
  changeWallet = currencyLabel => value => {
    this.wallets[currencyLabel] = value
  }

  @action('fetch data')
  fetchData = async () => {
    const {username, password} = this
    await fetch('http://localhost:3030/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
      .then(res => res.json())
      .then(({token}) => (this.token = token))
      .catch(err => console.error(err))

    console.log(' LOG ___ token ', this.token)
    if (!this.token) return null
    await fetch('http://localhost:3030/api/cats', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.token}`,
      },
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))

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
