import React from 'react'
import Component from '../CurrencyBadge'
import {mount} from 'enzyme'
import {wrapInTestContext} from '../../../helpers/dnd'

describe('Coverter: Currency badge tests', () => {
  describe('Markup', () => {
    it('Basic markup', () => {
      const WrappedComponent = wrapInTestContext(Component)

      const wrapper = mount(<WrappedComponent name="Test name" id={123} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Label icon should change', () => {
      const WrappedComponent = wrapInTestContext(Component)

      const wrapper = mount(<WrappedComponent name="Test name" id={123} icon="Bitcoin" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Label name should change', () => {
      const WrappedComponent = wrapInTestContext(Component)

      const wrapper = mount(<WrappedComponent name="Ethereum" id={123} icon="Ethereum" />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Dragging behaviour', () => {
    it('Label name should change', () => {
      const WrappedComponent = wrapInTestContext(Component)

      const wrapper = mount(<WrappedComponent name="Ethereum" id={123} icon="Ethereum" />)

      const backend = wrapper
        .instance()
        .getManager()
        .getBackend()

      backend.simulateBeginDrag([
        wrapper
          .find('DragSource(CurrencyBadge)')
          .instance()
          .getHandlerId(),
      ])

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
