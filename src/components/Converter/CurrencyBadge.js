import React, {Component} from 'react'
import {DragSource} from 'react-dnd'
// import styled from 'react-emotion'
import {getEmptyImage} from 'react-dnd-html5-backend'
import PropTypes from 'prop-types'

import Label from '../common/Label'

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectPreview: connect.dragPreview(),
})

const spec = {
  beginDrag: ({id, name}) => ({id, name}),
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

  componentDidMount() {
    this.props.connectPreview && this.props.connectPreview(getEmptyImage())
  }

  render() {
    const {isDragging, connectDragSource, name, id} = this.props
    const opacity = isDragging ? 0.4 : 1
    return (
      connectDragSource &&
      connectDragSource(
        <div style={{display: 'inline-block'}}>
          <Label
            icon={id}
            caption={name}
            style={{opacity, cursor: 'move', flex: '33% 0 0', zIndex: 1}}
          />
        </div>,
      )
    )
  }
}
