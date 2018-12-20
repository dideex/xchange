import {observable, action} from 'mobx'
import Cookie from 'js-cookie'
import Api from '../components/Api'
import {noty} from '../components/common'
import {setToken, logout, getToken, getAdminStatus} from './utils'

// Mobx UserData store
// Keeps all data about user
// Includes their wallets, orders and language
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
  @observable locale
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
    this.isNetworkError = false
    this.orders = []
    this.errorEmitter = Api.errorEmitter.bind(this)
  }

  constructor() {
    this.locale = Cookie.get('locale') || 'ru-RU'
    this.token = getToken()
    this._setInitalData()
    this._checkToken()
    if (getAdminStatus()) this.isAdmin = true
    this.fetchData()
  }

  // Checks valid token is
  _checkToken = () => {
    const token = getToken()
    if (!token) return null
    Api.get('token', '', token)
      .then(({success}) => {
        if (!success) {
          noty('Ошибка входа в аккаунт', 'error')
          logout()
        }
      })
      .catch(err => {
        console.error(err)
        noty('Ошибка сети', 'error')
        logout()
      })
  }

  @action('clear message error field')
  clearErr = () => (this.errorMessage = null)

  // Change langauge
  @action('change locale')
  changeLocale = locale => {
    this.locale = locale
    Cookie.set('locale', locale)
  }
  // Change login
  @action('change login')
  changeLogin = login => {
    this.clearErr()
    this.login = login
  }
  // change username
  @action('change username')
  changeUsername = username => {
    this.clearErr()
    this.username = username
  }
  // change password
  @action('change password')
  changePassword = password => {
    this.clearErr()
    this.password = password
  }
  //change email
  @action('change email')
  changeEmail = email => {
    this.clearErr()
    this.email = email
  }
  // change phone
  @action('change phone')
  changePhone = phone => {
    this.clearErr()
    this.phone = phone
  }
  // set wallet with currency id
  @action('change wallet')
  changeWallet = currencyLabel => value => {
    this.wallets[currencyLabel] = value
  }
  // Clean store and remove token
  @action('sign out')
  signout = () => {
    this._setInitalData()
    noty('Вы вышли из аккаунта')
    logout()
  }
  /**
   * Get user data by token from the server
   * @public
   */
  @action('fetch user data from the server')
  fetchData = () => {
    const token = getToken()
    if (!token) return null
    this.token = token

    Api.get('userData', '', token)
      .then(({wallets, lastOperations, username, email, login, convertedAmount}) => {
        this.login = login
        this.username = username
        this.email = email
        this.wallets = wallets || {}
        this.lastOperations = lastOperations || []
        this.convertedAmount = convertedAmount
      })
      .catch(err => {
        console.error(err)
        noty('Ошибка сети', 'error')
      })
  }
  /**
   * Post new user data to the server
   * @param token{Stirng}
   * @return {Promise}
   * @public
   */
  @action('udpate user data')
  updateInfo = () => {
    const token = getToken()
    if (!token) return Promise.resolve()
    this.token = token

    const {username, wallets, email} = this
    return Api.post('userData', {username, wallets, email}, this.token).catch(err => {
      console.error(err)
      noty('Ошибка сети', 'error')
    })
  }
  /**
   * Auth user
   * @param Username{String}, passowrd{String}
   * @public
   */
  @action('Get token with username and passoword')
  getToken = () => {
    this.loading = true
    this.isNetworkError = false
    const {login: username, password} = this
    Api.post('signinUser', {username, password})
      .then(
        this.errorEmitter(props => {
          const {token, isAdmin} = props
          this.loading = false
          this.token = token
          setToken(token, isAdmin)
          this.fetchData()
          if (isAdmin) {
            this.isAdmin = true
            noty('Hello admin!')
          } else {
            noty('Вы успешно вошли в аккаунт')
          }
        }),
      )
      .catch(err => {
        this.loading = false
        console.error(err)
        noty('Ошибка сети', 'error')
      })
  }

  /**
   * Send data to the server to create a new user
   * @param login{String} email{String} username{String} password{String}
   * @returns token{String}
   * @public
   */
  @action('Signup new user')
  signupUser = () => {
    const {login, email, username, password} = this
    Api.post('signupUser', {login, email, username, password})
      .then(
        this.errorEmitter(({token}) => {
          this.token = token
          noty('Вы успешно создали аккаунт')
          setToken(token)
          this.fetchData()
        }),
      )
      .catch(err => {
        noty('Ошибка сети', 'error')
        console.error(err)
      })
  }

  /**
   * Fetch all orders for user authed by the token
   * @param token{String}
   * @return [Orders]
   * @public
   */
  @action('fetch orders by token')
  fetchOrdersByToken = async () => {
    if (!this.token) return null
    this.loading = true
    await Api.get('orders', '', this.token)
      .then(
        this.errorEmitter(data => {
          this.orders = Object.values(data)
        }),
      )
      .catch(err => {
        noty('Ошибка сети', 'error')
        console.error(err)
      })
    this.loading = false
    return Promise.resolve()
  }

  /**
   * Fetch order by id, when we havn't got the token
   * @param id{String}
   * @return Order{Object}
   * @public
   */
  @action('fetch order without token')
  fetchGuestOrder = async id => {
    this.loading = true
    const response = await Api.get('order', `?_id=${id}`)
      .then(this.errorEmitter(data => data))
      .catch(err => {
        noty('Ошибка сети', 'error')
        console.error(err)
      })
    this.loading = false
    if (response) return response
  }
}

export const user = new User()
