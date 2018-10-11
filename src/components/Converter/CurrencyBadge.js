import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DragSource} from 'react-dnd'

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  // connectPreview: connect.dragPreview(),
})

const spec = {
  beginDrag : ({id}) => ({id}),
  endDrag(props, monitor) {
    console.log('end drag ', props, monitor)
  },
}

// Index component;
@DragSource('cash', spec, collect)
export default class CurrencyBadge extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }

  render() {
    const {isDragging, connectDragSource, name} = this.props
    const opacity = isDragging ? 0.4 : 1
    return (
      connectDragSource &&
      connectDragSource(
        <li style={{opacity}}>
          {name}
        </li>,
      )
    )
  }
}
