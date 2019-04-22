import React from 'react'
import Component from '../index'
import {mountWithIntl} from '../../../helpers/intl'

describe('Staff index', () => {
  it('Basic markup', () => {
    const wrapper = mountWithIntl(<Component />)

    expect(wrapper.html()).toMatchSnapshot()
  })
})