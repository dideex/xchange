import React from 'react'
import Component from '../Input'
import {shallow, mount, render} from 'enzyme'

describe('Input behaviour', () => {
  const testValue = 'Test value'

  it('markup', () => {
    const wrapper = shallow(<Component handleChange={() => {}} />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('Values behaviour', () => {
    it('Value should be', () => {
      const wrapper = shallow(<Component handleChange={() => {}} value={testValue} />)
      expect(wrapper.html()).toContain(testValue)
    })

    it('handleChange should be invoked on form change', async () => {
      const toggle = jest.fn()
      const wrapper = mount(<Component handleChange={toggle} value="" />)
      wrapper.find('input').simulate('change', {target: {value: testValue}})
      expect(toggle).toHaveBeenCalledTimes(1)
      expect(toggle).toHaveBeenCalledWith(testValue)
    })

    it('Get value from input first', async () => {
      const toggle = jest.fn()
      const wrapper = mount(<Component handleChange={toggle} value="" />)
      const input = wrapper.find('input')
      input.simulate('change', {target: {value: 'Changed'}})
      // console.log(wrapper.debug())
      console.log(input.get(0).value)
    })
  })
})
