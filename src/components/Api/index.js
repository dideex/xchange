import {noty} from '../common'

export class Api {
  constructor() {
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3040'
        : 'http://176.119.158.145:3040'
    this.backend = url
    this.isNetworkError = false
  }

  post(endpoint, data = {}, token = null) {
    return fetch(`${this.backend}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
  }

  get(endpoint, params = '', token = null) {
    return fetch(`${this.backend}/api/${endpoint}${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }).then(response => response.json())
  }

  errorEmitter = fn => ({err, errCode, ...data}) => {
    if (err) {
      this.isNetworkError = true
      console.error('errorEmitter ___ ', errCode)
      noty(err, 'error')
    } else return fn(data)
  }
}

export default new Api()
