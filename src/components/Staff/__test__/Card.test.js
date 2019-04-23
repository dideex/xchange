import React from 'react'
import Component from '../Card'
import {shallow} from 'enzyme'

describe('Staff card', () => {
  const props = {
    photo: 'fake photo',
    name: 'fake name',
    role: 'fake role',
  }
  describe('Markup', () => {
    it('Basic markup 1', () => {
      const wrapper = shallow(<Component {...props} svg="staff1" />)

      expect(wrapper.html()).toMatchSnapshot()
    })
    it('Basic markup 2', () => {
      const wrapper = shallow(<Component {...props} svg="staff2" />)

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})