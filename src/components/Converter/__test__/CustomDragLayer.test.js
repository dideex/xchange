import React from 'react'
import {mount, shallow} from 'enzyme'
import {DragDropContext, DragSource} from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'
import PropTypes from 'prop-types'

import Component from '../CustomDragLayer'
import {wrapInTestContext} from '../../../helpers/dnd'

describe('Coverter: Currency badge tests', () => {
  it("Shouldn't render if wasn't dragging", () => {
    const WrappedComponent = wrapInTestContext(Component)

    const wrapper = mount(<WrappedComponent />)
    expect(wrapper.html()).toMatchSnapshot()
  })
  describe('Preview behavriour', () => {
    const createComponent = ({generator = jest.fn(), source = null} = {}) => {
      @DragDropContext(TestBackend)
      class TestRoot extends React.Component {
        render() {
          return (
            <div>
              {source}
              <Component generator={generator} />
            </div>
          )
        }
      }

      return mount(<TestRoot />)
    }

    it('Basic markup', () => {
      const Source =
        @DragSource(
          'cash',
          {
            beginDrag: () => {
              return {coucou: 'cash'}
            },
            canDrag: () => {
              return true
            },
          },
          connect => {
            return {connectDragSource: connect.dragSource()}
          },
        )
        class DS extends React.Component {
          static propTypes = {connectDragSource: PropTypes.func}
          render() {
            return this.props.connectDragSource(<div />)
          }
        }

      const wrapper = createComponent({source: <Source />})

      const backend = wrapper
        .instance()
        .getManager()
        .getBackend()
      backend.simulateBeginDrag(
        [
          wrapper
            .find(Source)
            .instance()
            .getHandlerId(),
        ],
        {
          clientOffset: {x: 1, y: 2},
          getSourceClientOffset: () => {
            return {x: 1000, y: 2000}
          },
        },
      )

      wrapper.update()

      // const backend = wrapper
      //   .instance()
      //   .getManager()
      //   .getBackend()
      // const ctx = wrapper.instance().getChildContext()
      // console.log('TCL: backend', ctx)

      // wrapper.find('CustomDragLayer').render()
      console.log(wrapper.debug())
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
