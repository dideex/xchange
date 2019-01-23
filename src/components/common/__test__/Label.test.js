import React from 'react'
import Component from '../Label'
import {shallow, mount} from 'enzyme'

describe('Label behaviour', () => {
  describe('Markup', () => {
    it('Base markup', () => {
      const snapshotWrapper = shallow(<Component caption="test label" />)
      expect(snapshotWrapper.html()).toMatchSnapshot()
    })

    it('Base with custom styles', () => {
      const snapshotWrapper = shallow(
        <Component caption="test label" style={{test: 'new test styles'}} />,
      )
      expect(snapshotWrapper.html()).toMatchSnapshot()
    })

    it('Base with icon', () => {
      const snapshotWrapper = shallow(<Component caption="test label" icon="Bitcoin" />)
      expect(snapshotWrapper.html()).toMatchSnapshot()
    })

    it('Base with big icon', () => {
      const snapshotWrapper = shallow(<Component caption="test label" big />)
      expect(snapshotWrapper.html()).toMatchSnapshot()
    })

    it('Base with big draggin icon', () => {
      const snapshotWrapper = shallow(<Component caption="test label" big isDragging />)
      expect(snapshotWrapper.html()).toMatchSnapshot()
    })
  })

  it('Custom onclick handler', () => {
    const click = jest.fn()
    const wrapper = mount(<Component caption="test label" onClick={click}/>)
    
    wrapper.simulate('click')
    expect(click).toHaveBeenCalledTimes(1)
  })
})
