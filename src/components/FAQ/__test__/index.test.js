import React from 'react'
import Component from '../index'
import {shallow} from 'enzyme'

describe('FAQ tests', () => {
  describe('Markup', () => {
    it('Basic markup', () => {
      const wrapper = shallow(<Component />)
      expect(wrapper.html()).toMatchSnapshot()
    })
    it('After collapsing block', () => {
      const wrapper = shallow(<Component />)
      wrapper.find('.currency-item').first().simulate('click')
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})