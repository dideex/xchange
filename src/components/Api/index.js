export class Api {
  constructor() {
    this.backend = 'http://localhost:3030'
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
    })
  }
  get(endpoint, params = '', token = null) {
    return fetch(`${this.backend}/api/${endpoint}${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    })
  }
}

export default new Api()
