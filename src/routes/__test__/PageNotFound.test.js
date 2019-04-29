import React from 'react'
import Component from '../PageNotFound'
import {shallow} from 'enzyme'

describe('Routes control panel', () => {
  it('Component should mounts without crash', () => {
    const wrapper = shallow(<Component />)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
