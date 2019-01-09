import LO from '../LastOperations'
import mockio, {serverSocket, cleanUp} from 'socket.io-client'
import Api from '../../components/Api'

// jest.mock('socket.io-client', url => {
//   return {
//     on: data => data,
//     default: () => {},
//   }
// })

describe('Last operations tests', () => {
  let store
  beforeEach(() => {
    store = new LO()
  })

  it('init store', () => {
    expect(store.loading).toBeTruthy()
  })
})
