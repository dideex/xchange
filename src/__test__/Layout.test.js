import React from 'react'
import Component from '../Layout'
import {Provider as MobxProvider} from 'mobx-react'

import CashStore from '../store/Cash'
import UserStore from '../store/User'
import {mountWrap} from '../helpers/router-intl-context'

jest.mock('../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../components/common/Noty', () => ({
  noty: () => {},
}))

describe('Routes control panel', () => {
  let userStore = new UserStore()
  let cashStore = new CashStore()
  it('Component should mounts without crash', () => {
    const wrapper = mountWrap(
      <MobxProvider {...{userStore, cashStore}}>
        <Component />
      </MobxProvider>,
    )
    wrapper.unmount()
  })

  it('Loading should be removed after cDM', () => {
    document.body.classList.add = jest.fn()
    document.body.classList.remove = jest.fn()
    const wrapper = mountWrap(
      <MobxProvider {...{userStore, cashStore}}>
        <Component />
      </MobxProvider>,
    )
    wrapper.unmount()
    expect(document.body.classList.add).toHaveBeenCalledTimes(1)
    expect(document.body.classList.add).toHaveBeenCalledWith('loaded')
    expect(document.body.classList.remove).toHaveBeenCalledTimes(1)
    expect(document.body.classList.remove).toHaveBeenCalledWith('loading')
  })
})
