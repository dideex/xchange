import React from 'react'
import Component from '../index'
import {shallow} from 'enzyme'

describe('Main', () => {
  it('Basic makrup', () => {
    const wrapper = shallow(
      <Component>
        <div>children</div>
      </Component>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
})
