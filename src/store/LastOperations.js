import {observable} from 'mobx'
import openSocket from 'socket.io-client'

// last operations store
class LastOperations {
  @observable.ref data
  @observable loading
  
  constructor() {
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3040'
        : 'http://176.119.158.145:3040'
    this.loading = true
    this.data = []
    // this.socket = openSocket('http://localhost:3040')
    this.socket = openSocket(url)
    this.socket.on('message', this._socketResolver)
  }

  _socketResolver = ({type, data, order}) => {
    switch (type) {
      case 'broadcast':
        this.loading = false
        return this.data = [...this.data, order]
      case 'init':
        this.loading = false
        return this.data = data
      default:
        return console.log('unknown message')
    }
  }
}

export const lastOperations = new LastOperations()

export default LastOperations
