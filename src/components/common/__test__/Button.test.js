import React from 'react'
import Component from '../Button'
import {shallow} from 'enzyme'

describe('Accent button behaviour', () => {
  it('Markup', () => {
    const snapshotWrapper = shallow(<Component toggle={() => {}} caption="snapshot" />)
    expect(snapshotWrapper.html()).toMatchSnapshot()
  })

  it('Markup disabled button', () => {
    const snapshotWrapper = shallow(
      <Component toggle={() => {}} caption="snapshot" disabled />,
    )
    expect(snapshotWrapper.html()).toMatchSnapshot()
  })

  it('Markup loading button', () => {
    const snapshotWrapper = shallow(
      <Component toggle={() => {}} caption="snapshot" loading />,
    )
    expect(snapshotWrapper.html()).toMatchSnapshot()
  })

  it('Toggle button should be', () => {
    const toggle = jest.fn()
    const wrapper = shallow(
      <Component toggle={toggle} caption="caption">
        Button
      </Component>,
    )
    wrapper.simulate('click')
    expect(toggle).toHaveBeenCalledTimes(1)
  })

  it('Toggle disabled button should not been', () => {
    const toggle = jest.fn()
    const disabledWrapper = shallow(
      <Component toggle={toggle} caption="caption" disabled>
        Button
      </Component>,
    )
    disabledWrapper.simulate('click')
    expect(toggle).toHaveBeenCalledTimes(0)
  })
})
