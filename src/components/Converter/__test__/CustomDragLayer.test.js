import React from 'react'
import {mount} from 'enzyme'

import CustomDragLayer, {UndecoratedCustomDragLayer} from '../CustomDragLayer'
import Browser from '../../../helpers/browser'
import {wrapInTestContext} from '../../../helpers/dnd'
import {delay} from '../../../helpers'

describe('Coverter: Currency badge tests', () => {
  it("Shouldn't render if wasn't dragging", () => {
    const WrappedComponent = wrapInTestContext(CustomDragLayer)

    const wrapper = mount(<WrappedComponent />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('Preview behavriour', () => {
    let draggableNode = Browser.getDocument().createElement('div')

    it.only('Should not render less then 50 times in a second', async () => {
      const wrapper = mount(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          draggableNode={draggableNode}
          isDragging={true}
          itemType="cash"
          item={{cursorPosition: {dragX: 10, dragY: 10}, icon: 'bitcoin'}}
        />,
      )

      wrapper.instance().forceUpdate = jest.fn()
      wrapper.setProps({cursorPosition: {dragY: 30}})
      await delay(() => {}, 100)
      wrapper.setProps({cursorPosition: {dragY: 30}})
      await delay()
      wrapper.setProps({cursorPosition: {dragY: 30}})
      await delay(() => {}, 100)
      expect(wrapper.instance().forceUpdate).toHaveBeenCalledTimes(2)
    })

    it('Badge should be hidden when is not dragging', () => {
      const wrapper = mount(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          draggableNode={draggableNode}
          isDragging={true}
          itemType="cash"
          item={{cursorPosition: {dragX: 10, dragY: 10}, icon: 'bitcoin'}}
        />,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Bitcoin icon should render correctly', () => {
      const wrapper = mount(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          offset={{x: 1, y: 2}}
          draggableNode={draggableNode}
          isDragging={true}
          itemType="cash"
          item={{cursorPosition: {dragX: 10, dragY: 10}, icon: 'bitcoin'}}
        />,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Ethereum icon should render correctly', () => {
      const wrapper = mount(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          offset={{x: 1, y: 2}}
          draggableNode={draggableNode}
          isDragging={true}
          itemType="cash"
          item={{cursorPosition: {dragX: 10, dragY: 10}, icon: 'Ethereum'}}
        />,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Badge should change position', () => {
      const wrapper = mount(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          offset={{x: 30, y: 20}}
          draggableNode={draggableNode}
          isDragging={true}
          itemType="cash"
          item={{cursorPosition: {dragX: 10, dragY: 10}, icon: 'bitcoin'}}
        />,
      )
      expect(wrapper.find('CustomDragLayer > div').props().style).toMatchSnapshot()
    })

    it('Badge should calculate dragged coordinates', () => {
      const wrapper = mount(
        <UndecoratedCustomDragLayer
          currentOffset={{x: 1, y: 2}}
          offset={{x: 1, y: 2}}
          draggableNode={draggableNode}
          isDragging={true}
          itemType="cash"
          item={{cursorPosition: {dragX: 20, dragY: 20}, icon: 'bitcoin'}}
        />,
      )
      expect(wrapper.find('CustomDragLayer > div').props().style).toMatchSnapshot()
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
