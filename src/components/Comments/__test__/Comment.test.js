import React from 'react'
import Component from '../Comment'
import {mount} from 'enzyme'

describe('Comments component', () => {
  it('Clean markup', () => {
    const data = {
      photo: '',
      name: '',
      role: '',
      message: '',
    }
    const wrapper = mount(<Component {...data} />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Markup with data', () => {
    const data = {
      photo: 'Some test photo',
      name: 'Some test name',
      role: 'Some test Role',
      message: 'Some test message',
    }
    const wrapper = mount(<Component {...data} />)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
