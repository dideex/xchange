import React from 'react'
import Component from '../AccentBlock'
import {shallow} from 'enzyme'

describe('AccentBlock behaviour', () => {
  it('Markup', () => {
    const wrapper = shallow(<Component value="snapshot" />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Value should be', () => {
    const wrapper = shallow(<Component value="testValue" />)
    expect(wrapper.html()).toContain('testValue')
  })
  
  it('Value should be', () => {
    const wrapper = shallow(<Component value="testValue 2" />)
    expect(wrapper.html()).toContain('testValue 2')
  })
})
