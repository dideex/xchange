import {observable, action, computed} from 'mobx'

// menu state
class Store {
  @observable
  state // close | constructor | main | order

  constructor() {
    this.state = 'close'
  }
  // triggers opening or closing menu
  @action('toggle-state')
  toggleMenu = () => {
    this.state = this.state === 'close' ? 'main' : 'close'
  }

  // returns true when menu is opened
  @computed
  get isOpen() {
    return this.state !== 'close'
  }
}

const store = new Store()

export default store
export {Store}
