import React from 'react'
import Component from '../AboutUs'
import {mountWithIntl} from '../../helpers/intl'

describe('About us', () => {
  it('Basic markup', () => {
    const wrapper = mountWithIntl(<Component />)

    expect(wrapper.html()).toMatchSnapshot()
  })

})