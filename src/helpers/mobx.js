import React from 'react'
import {Provider} from 'mobx-react'
import {lastOperations, cash, user} from '../store'

export const MobxProvider = ({children}) => {
  return (
    <Provider lastOperationsStore={lastOperations} cashStore={cash} userStore={user}>
      {children}
    </Provider>
  )
}
