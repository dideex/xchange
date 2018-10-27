import {observable, action} from 'mobx'
import Cookie from 'js-cookie'

const setToken = token => Cookie.set('token', token)

const logout = () => Cookie.remove('token')

const getToken = () => Cookie.get('token') || null

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

  @action('fetch user data from server')
  fetchData = async () => {
    const token = getToken()
    if (!token) return null
    this.token = token

    await fetch('http://localhost:3030/api/userData', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.token}`,
      },
    })
      .then(res => res.json())
      .then(({wallets, lastOperations, username, email}) => {
        console.log(" LOG ___ username ",  )
        this.wallets = wallets
        this.lastOperations = lastOperations
        this.username = username
        this.email = email
      })
      .catch(err => console.error(err))
  }

  @action('Get token with username and passoword')
  getToken = async () => {
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
      .then(({token}) => {
        this.token = token
        setToken(token)
        this.fetchData()
      })
      .catch(err => console.error(err))
  }
}

export const user = new User()
