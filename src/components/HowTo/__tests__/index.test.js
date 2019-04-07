import React from 'react'
import Component from '../index'

import {mountWithIntl} from '../../../helpers/intl'

describe('HowTo markup', () => {
  it('Basic markup', () => {
    const wrapper = mountWithIntl(<Component />)

    expect(wrapper.html()).toMatchSnapshot()
  })
})