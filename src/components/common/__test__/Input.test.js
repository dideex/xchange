import React from 'react'
import Component from '../Input'
import {shallow, mount} from 'enzyme'

describe('Input behaviour', () => {
  it('markup', () => {
    const wrapper = shallow(<Component handleChange={() => {}} />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('Values behaviour', () => {
    it('Value should be', () => {
      const wrapper = shallow(<Component handleChange={() => {}} value="testValue" />)
      expect(wrapper.html()).toContain('testValue')
    })

    it('Value should be changing', async () => {
      const toggle = jest.fn(val => 'val')
      const wrapper = mount(<Component handleChange={toggle} value="testValue" />)
      // await wrapper.simulate('change', {target: {value: "new value"}})
      console.log(wrapper.html())
      console.log(wrapper.find('input'))
    })

  })
})
