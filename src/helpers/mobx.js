import React from 'react'
import {Provider} from 'mobx-react'
import {lastOperations, cash, user} from '../store'

jest.mock('../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}}),
  errorEmitter: jest.fn(data => fn => data(fn)),
}))

// jest.mock('../components/common', () => ({
//   noty: () => {},
//   Loading: () => <div>Loading</div>,
// }))

export const MobxProvider = ({children, ...stores}) => {
  return (
    <Provider
      lastOperationsStore={lastOperations}
      cashStore={cash}
      userStore={user}
      {...stores}
    >
      {children}
    </Provider>
  )
}
