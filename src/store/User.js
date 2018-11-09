import {observable, action} from 'mobx'
import Cookie from 'js-cookie'
import Api from '../components/Api'
import {noty} from '../components/common'

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
    this.token = getToken()
    this._setInitalData()
    this._checkToken()
    if (getAdminStatus()) this.isAdmin = true
    this.fetchData()
  }

  _checkToken = () => {
    const token = getToken()
    if (!token) return null
    Api.get('token', '', token)
      .then(response => response.json())
      .then(({success}) => {
        if (!success) {
          noty('Ошибка входа в аккаунт', 'error')
          logout()
        }
      })
      .catch(() => {
        noty('Ошибка сети', 'error')
        logout()
      })
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

  @action('sign out')
  signout = () => {
    this._setInitalData()
    noty('Вы вышли из аккаунта')
    logout()
  }

  @action('fetch user data from the server')
  fetchData = async () => {
    const token = getToken()
    if (!token) return null
    this.token = token

    await Api.get('userData', '', token)
      .then(res => res.json())
      .then(({wallets, lastOperations, username, email, login, convertedAmount}) => {
        this.login = login
        this.username = username
        this.email = email
        this.wallets = wallets || {}
        this.lastOperations = lastOperations || []
        this.convertedAmount = convertedAmount
      })
      .catch(() => noty('Ошибка сети', 'error'))
  }

  @action('udpate user data')
  updateInfo = () => {
    const token = getToken()
    if (!token) return null
    this.token = token

    const {username, wallets, email} = this
    return Api.post('userData', {username, wallets, email}, this.token).catch(() =>
      noty('Ошибка сети', 'error'),
    )
  }

  @action('Get token with username and passoword')
  getToken = () => {
    this.loading = true
    this.errorMessage = ''
    const {login: username, password} = this
    Api.post('signinUser', {username, password})
      .then(res => res.json())
      .then(({token, err, isAdmin}) => {
        this.loading = false
        if (token && !err) {
          this.token = token
          setToken(token, isAdmin)
          this.fetchData()
          if (isAdmin) {
            this.isAdmin = true
            noty('Hello admin!')
          } else {
            noty('Вы успешно вошли в аккаунт')
          }
        } else {
          noty(err, 'error')
        }
      })
      .catch(() => {
        this.loading = false
        noty('Ошибка сети', 'error')
      })
  }

  @action('Signup new user')
  signupUser = () => {
    const {login, email, username, password} = this
    Api.post('signupUser', {login, email, username, password})
      .then(res => res.json())
      .then(data => {
        const {token, err} = data
        if (!token) return noty(err, 'error')
        this.token = token
        noty('Вы успешно создали аккаунт')
        setToken(token)
        this.fetchData()
      })
      .catch(() => noty('Ошибка сети', 'error'))
  }

  @action('fetch orders by token')
  fetchOrdersByToken = async () => {
    if (!this.token) return null
    this.loading = true
    await Api.get('orders', '', this.token)
      .then(res => res.json())
      .then(data => {
        if (data.err) this.errorMessage = data.err
        else this.orders = data
      })
      .catch(err => {
        noty('Ошибка сети', 'error')
        console.error(err)
      })
    this.loading = false
  }

  @action('fetch order without token')
  fetchGuestOrder = async id => {
    this.loading = true
    const response = await Api.get('order', '', `?_id=${id}`)
      .then(res => res.json())
      .then(data => data)
      .catch(err => {
        noty('Ошибка сети', 'error')
        console.error(err)
      })
    this.loading = false
    if (response) return response
  }
}

export const user = new User()
