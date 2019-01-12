import React from 'react'
import Component from '../AccentBlock'
import {shallow, mount, render} from 'enzyme'

describe('Comments component', () => {
  const wrapper = shallow(<Component value="testValue" />)
  it('jest', () => {
    expect(1 + 1).toBe(2)
  })
  it('value should be', () => {
    console.log(' LOG ___ wrapper ', JSON.stringify(wrapper.html(), null, 2))
    expect(wrapper.html()).toContain('testValue')
  })
})
