import React from 'react'
import Component from '../AccentButton'
import {shallow} from 'enzyme'

describe('Accent button behaviour', () => {
  const toggle = jest.fn()
  const wrapper = shallow(<Component toggle={toggle}>Button</Component>)

  it('Markup', () => {
    const snapshotWrapper = shallow(
      <Component toggle={() => {}}>
        <div>Snapshot</div>
      </Component>,
    )
    expect(snapshotWrapper.html()).toMatchSnapshot()
  })

  it('Children shoul be', () => {
    expect(wrapper.html()).toContain('Button')
  })

  it('Toggle button should be', () => {
    wrapper.simulate('click')
    expect(toggle).toHaveBeenCalledTimes(1)
  })
})
