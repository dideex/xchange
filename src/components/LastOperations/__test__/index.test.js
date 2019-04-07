import React from 'react'
import Component from '../index'
import {Provider as MobxProvider} from 'mobx-react'
import {serverSocket} from 'socket.io-client'

import LastOperations from '../../../store/LastOperations'

import {mountWithIntl} from '../../../helpers/intl'
import {fakeUser, fakeCurrnecy} from '../../../helpers/fixtures'

describe('Last operations: index', () => {
  let lastOperationsStore = new LastOperations()
  const operation = {
    currency: fakeCurrnecy[0].id,
    email: fakeUser.email,
    inputValue: '10',
    outputValue: '100',
    paymentStatus: 1,
    inputLabel: fakeCurrnecy[0].icon,
    outputLabel: fakeCurrnecy[2].icon,
  }
  const data = [operation]

  beforeEach(() => {
    lastOperationsStore = new LastOperations()
  })

  it('Loading should appear', () => {
    const wrapper = mountWithIntl(
      <MobxProvider>
        <Component lastOperationsStore={lastOperationsStore} />
      </MobxProvider>,
    )

    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('Markup', () => {
    const wrapper = mountWithIntl(
      <MobxProvider>
        <Component lastOperationsStore={lastOperationsStore} />
      </MobxProvider>,
    )
    it('Basic init markup', () => {
      serverSocket.emit('message', {type: 'init', data})

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('New operation should be added', () => {
      serverSocket.emit('message', {type: 'broadcast', order: operation})

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
