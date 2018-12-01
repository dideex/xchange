import {noty} from '../common'

export class Api {
  constructor() {
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3030'
        : 'http://176.119.158.145:3030'
    this.backend = url
    this.isNetworkError = false
  }

  /**
  * Returns response from the server
  * @param endpoint{String}, data{Object}, token?{String}
  * @return Promise<Resolve>
  * @public
  */
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

  /**
  * Fetch data from the server
  * @param endpoint{String}, params?{String}, token?{String}
  * @return Promise<Resolve>
  * @public
  */
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

  // Notyfication an error
  errorEmitter = fn => ({err, errCode, ...data}) => {
    if (err) {
      this.isNetworkError = true
      noty(err, 'error')
      throw new Error()
    } else return fn(data, err)
  }
}

export default new Api()
