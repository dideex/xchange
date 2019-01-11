import LO from '../LastOperations'
import mockio, {serverSocket, cleanUp} from 'socket.io-client'

describe('Last operations tests', () => {
  let store
  beforeEach(() => {
    store = new LO()
  })

  it('init store', () => {
    expect(store.loading).toBeTruthy()
    expect(store.data.length).toBe(0)
  })

  it('Initial socket data', () => {
    expect(store.loading).toBeTruthy()
    serverSocket.emit('message', {type: 'init', data: [1, 2, 3, 4]})
    expect(store.data).toMatchSnapshot()
    expect(store.loading).toBeFalsy()
    serverSocket.emit('message', {type: 'init', data: [4, 3, 2, 1]})
    expect(store.data).toMatchSnapshot()
    expect(store.loading).toBeFalsy()
  })

  it('Braodcast new oparation', () => {
    serverSocket.emit('message', {type: 'broadcast', order: {data: 'new operation 1'}})
    expect(store.data).toMatchSnapshot()
    serverSocket.emit('message', {type: 'broadcast', order: {data: 'new operation 2'}})
    expect(store.data).toMatchSnapshot()
    serverSocket.emit('message', {type: 'broadcast', order: {data: 'new operation 3'}})
    expect(store.data).toMatchSnapshot()
    expect(store.loading).toBeFalsy()
  })
})
