import React from 'react'
import Component from '../index'
import {mountWithIntl} from '../../../helpers/intl'

describe('Tests', () => {
  it('Base markup', () => {
    const wrapper = mountWithIntl(<Component />)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
