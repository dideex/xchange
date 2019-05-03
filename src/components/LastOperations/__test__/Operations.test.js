import React from 'react'
import Component from '../Operation'

import {mountWithIntl} from '../../../helpers/intl'
import {fakeUser, fakeCurrnecy} from '../../../helpers/fixtures'

describe('Last operations: operation tests', () => {
  const props = {
    currency: fakeCurrnecy[0].id,
    email: fakeUser.email,
    inputValue: '10',
    outputValue: '100',
    paymentStatus: 1,
    inputLabel: fakeCurrnecy[0].icon,
    outputLabel: fakeCurrnecy[2].icon,
  }
  it('Basic markup', () => {
    const wrapper = mountWithIntl(<Component {...props} />)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
