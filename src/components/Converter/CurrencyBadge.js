import React, {Component} from 'react'
import {DragSource} from 'react-dnd'
// import styled from 'react-emotion'
import { getEmptyImage } from "react-dnd-html5-backend";
import PropTypes from 'prop-types'

import Label from '../common/Label'

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectPreview: connect.dragPreview(),
})

const spec = {
  beginDrag: ({id}) => ({id}),
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
    // this.props.connectPreview(<span>⚛</span>)
    this.props.connectPreview && this.props.connectPreview(getEmptyImage())
  }

  render() {
    const {isDragging, connectDragSource, name, id} = this.props
    const opacity = isDragging ? 0.4 : 1
    return (
      connectDragSource &&
      connectDragSource(
        <div style={{flex: '33% 0 0'}}>
          <Label icon={id} caption={name} style={{opacity, cursor: 'move'}} />
        </div>,
      )
    )
  }
}
