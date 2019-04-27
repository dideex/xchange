import React from 'react'
import Component from '../CP'
import {shallow} from 'enzyme'

describe('Routes control panel', () => {
  it('Markup', () => {
    const wrapper = shallow(<Component />)

    expect(wrapper.html()).toMatchSnapshot()
  })
})