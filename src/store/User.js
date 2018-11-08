import {observable, action} from 'mobx'
import Cookie from 'js-cookie'

const setToken = (token, isAdmin) => {
  if (isAdmin) {
    Cookie.set('token', token)
    Cookie.set('isAdmin', true)
  } else Cookie.set('token', token)
}

const logout = () => {
  Cookie.remove('token')
  Cookie.remove('isAdmin')
}

const getToken = () => Cookie.get('token') || null
const getAdminStatus = () => Cookie.get('isAdmin') || null

// menu state
export default class User {
  @observable username
  @observable email
  @observable phone
  @observable wallets
  @observable lastOperations
  @observable convertedAmount
  @observable loading
  @observable token
  @observable isAdmin
  @observable errorMessage
  @observable.ref orders

  _setInitalData = () => {
    this.login = ''
    this.username = ''
    this.password = ''
    this.email = ''
    this.phone = ''
    this.wallets = {}
    this.lastOperations = []
    this.convertedAmount = 0
    this.loading = false
    this.token = ''
    this.isAdmin = false
    this.errorMessage = null
    this.orders = []
  }

  constructor() {
    this._setInitalData()
    if(getAdminStatus()) this.isAdmin = true
    this.fetchData()
  }

  @action('clear message error field')
  clearErr = () => (this.errorMessage = null)

  @action('change login')
  changeLogin = login => {
    this.clearErr()
    this.login = login
  }
  @action('change username')
  changeUsername = username => {
    this.clearErr()
    this.username = username
  }
  @action('change password')
  changePassword = password => {
    this.clearErr()
    this.password = password
  }
  @action('change email')
  changeEmail = email => {
    this.clearErr()
    this.email = email
  }
  @action('change phone')
  changePhone = phone => {
    this.clearErr()
    this.phone = phone
  }
  @action('change wallet')
  changeWallet = currencyLabel => value => {
    this.wallets[currencyLabel] = value
  }

  @action('sigon out')
  signout = () => {
    this._setInitalData()
    logout()
  }

  @action('fetch user data from the server')
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
      .then(({wallets, lastOperations, username, email, login, convertedAmount}) => {
        this.login = login
        this.username = username
        this.email = email
        this.wallets = wallets || {}
        this.lastOperations = lastOperations || []
        this.convertedAmount = convertedAmount
      })
      .catch(err => console.error(err))
  }

  @action('udpate user data')
  updateInfo = async () => {
    const token = getToken()
    if (!token) return null
    this.token = token

    const {username, wallets, email} = this
    await fetch('http://localhost:3030/api/userData', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.token}`,
      },
      body: JSON.stringify({username, wallets, email}),
    })
      .then(res => console.log('updateInfo ___ res', res))
      .catch(err => console.error(err))
  }

  @action('Get token with username and passoword')
  getToken = async () => {
    this.loading = true
    this.errorMessage = ''
    const {login: username, password} = this
    await fetch('http://localhost:3030/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
      .then(res => res.json())
      .then(({token, error, isAdmin}) => {
        this.loading = false
        if (!error) {
          this.token = token
          setToken(token, isAdmin)
          this.fetchData()
          if (isAdmin) this.isAdmin = true
        } else {
          this.errorMessage = error
        }
      })
      .catch(err => {
        this.loading = false
        console.error(err)
      })
  }

  @action('Signup new user')
  signupUser = async () => {
    const {login, email, username, password} = this
    await fetch('http://localhost:3030/api/signupUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({login, email, username, password}),
    })
      .then(res => res.json())
      .then(data => {
        const {token, err} = data
        if (!token) return (this.errorMessage = err)
        this.token = token
        setToken(token)
        this.fetchData()
      })
      .catch(err => console.log('error', err))
  }

  @action('fetch orders by token')
  fetchOrdersByToken = async () => {
    if (!this.token) return null
    this.loading = true
    await fetch('http://localhost:3030/api/orders', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.err) this.errorMessage = data.err
        else this.orders = data
      })
      .catch(err => console.error(err))
    this.loading = false
  }

  @action('fetch order without token')
  fetchGuestOrder = async id => {
    this.loading = true
    const response = await fetch(`http://localhost:3030/api/order?_id=${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.error(err))
    this.loading = false
    if (response) return response
  }
}

export const user = new User()
