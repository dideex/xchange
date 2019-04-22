import React from 'react'
import Component from '../StaffSvg'
import {shallow} from 'enzyme'

describe('Staff svg', () => {
  it('Basic staff 1', () => {
    const wrapper = shallow(<Component id="staff1" />)

    expect(wrapper.html()).toMatchSnapshot()
  })
  it('Basic staff 2', () => {
    const wrapper = shallow(<Component id="staff2" />)

    expect(wrapper.html()).toMatchSnapshot()
  })
  it('Empty', () => {
    const wrapper = shallow(<Component id={null} />)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
