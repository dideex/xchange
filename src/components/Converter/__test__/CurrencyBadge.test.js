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
				const source = new NonDraggableSource()
				const sourceId = registry.addSource(Types.FOO, source)
      
      const registry = wrapper.instance().getRegistry()

      console.log(wrapper.debug())

      backend.simulateBeginDrag([
        wrapper
          .find('[data-testid="dragged-anchor"]')
          .instance()
          .getHandlerId(),
      ])

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})

/* 
  
      const backend = wrapper
        .instance()
        .getManager()
        .getBackend()

  // Test that the opacity is 1
  let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div')
  expect(div.props.style.opacity).toEqual(1)

  // Find the drag source ID and use it to simulate the dragging operation
  const box = TestUtils.findRenderedComponentWithType(root, Box)
  backend.simulateBeginDrag([box.getHandlerId()])

  // Verify that the div changed its opacity
  div = TestUtils.findRenderedDOMComponentWithTag(root, 'div')
  expect(div.style.opacity).toEqual(0.4)
  */
