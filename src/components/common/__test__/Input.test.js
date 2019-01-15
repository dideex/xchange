import React from 'react'
import Component from '../Input'
import {shallow, mount, render} from 'enzyme'

describe('Input behaviour', () => {
  it('markup', () => {
    const wrapper = shallow(<Component handleChange={() => {}} />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('Values behaviour', () => {
    it('Value should be', () => {
      const wrapper = shallow(<Component handleChange={() => {}} value="testValue" />).dive()
      expect(wrapper.html()).toContain('testValue')
    })

    it('Value should be changing', async () => {
      const toggle = jest.fn(val => 'val')
      const wrapper = shallow(<Component handleChange={toggle} value="testValue" />).dive()
      // await wrapper.simulate('change', {target: {value: "new value"}})
      // console.log(wrapper.html())
      console.log(wrapper.debug())
      console.log(wrapper.find('input'))
      console.log(wrapper.find('StyledInput'))
      console.log(wrapper.find('label'))
      
      // expect(toggle).toHaveBeenCalledTimes(1)
    })

  })
})
