import React from 'react'
import Component from '../Home'
import {Provider as MobxProvider} from 'mobx-react'

import CashStore from '../../store/Cash'
import UserStore from '../../store/User'
import LO from '../../store/LastOperations'
import {mountWrap} from '../../helpers/router-intl-context'

jest.mock('../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../../components/common/Noty', () => ({
  noty: () => {},
}))

describe('Routes control panel', () => {
  let userStore = new UserStore()
  let cashStore = new CashStore()
  let lastOperationsStore = new LO()
  it('Component should mounts without crash', () => {
    const wrapper = mountWrap(
      <MobxProvider {...{userStore, cashStore, lastOperationsStore}}>
        <Component />
      </MobxProvider>,
    )
    wrapper.unmount()
  })
})
