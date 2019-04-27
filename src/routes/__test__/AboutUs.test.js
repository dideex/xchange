import React from 'react'
import Component from '../AboutUs'
import {shallow} from 'enzyme'

describe('Routes about us', () => {
  it('Markup', () => {
    const wrapper = shallow(<Component />)

    expect(wrapper.html()).toMatchSnapshot()
  })
})