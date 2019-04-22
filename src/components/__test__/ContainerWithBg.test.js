import React from 'react'
import Component from '../ContainerWithBg'
import {mount} from 'enzyme'

describe('Container with bg', () => {
  const Node = () => <div>Test children</div>
  it('Basic markup', () => {
    const wrapper = mount(
      <Component>
        <Node />
      </Component>,
    )

    expect(wrapper.html()).toMatchSnapshot()
  })
})
