import React from 'react'
import Component from '../Card'
import {shallow} from 'enzyme'

describe('Staff card', () => {
  const props = {
    photo: 'fake photo',
    name: 'fake name',
    role: 'fake role',
    svg: 'fake svg'
  }
  describe('Markup', () => {
    it('Basic markup', () => {
      const wrapper = shallow(<Component {...props} />)

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})