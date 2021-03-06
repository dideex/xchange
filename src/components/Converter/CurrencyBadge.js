import React, {Component} from 'react'
import {DragSource} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import PropTypes from 'prop-types'

import {Label} from '../common'

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectPreview: connect.dragPreview(),
})

const spec = {
  beginDrag: ({id, icon, cursorPosition}) => ({id, icon, cursorPosition}),
  endDrag(props, monitor) {
    console.log('end drag ', props, monitor)
  },
}

// Currency label from Drag'n'drop area
@DragSource('cash', spec, collect)
export default class CurrencyBadge extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    id: PropTypes.number.isRequired,
  }

  componentDidMount() {
    // Hide default dragge preview layer
    this.props.connectPreview && this.props.connectPreview(getEmptyImage())
  }

  render() {
    const {isDragging, connectDragSource, name, icon} = this.props
    return (
      connectDragSource &&
      connectDragSource(
        <div data-testid="dragged-anchor" style={{display: 'inline-block'}}>
          <Label
            icon={icon}
            isDragging={isDragging}
            big={true}
            caption={name}
            style={{
              cursor: 'move',
              flex: '33% 0 0',
              zIndex: 1,
              borderRadius: 10,
            }}
          />
        </div>,
      )
    )
  }
}
