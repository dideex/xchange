import React, {Component} from 'react'
import {DragLayer} from 'react-dnd'
import BudgePreview from './controls/BudgeDragPrview'

const layerStyle = {
  position: 'fixed',
  pointerEvents: 'none',
  left: 0,
  top: 0,
  width: '50px',
  heigth: '50px',
  bottom: 0,
  right: 0,
  zIndex: 1000,
}

const PreviewMap = {
  cash: BudgePreview,
}

const collect = monitor => ({
  isDragging: monitor.isDragging(),
  offset: monitor.getSourceClientOffset(),
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
})

// CustomDragLayer component;
@DragLayer(collect)
export default class CustomDragLayer extends Component {
  static propTypes = {}

  getItem() {
    const {offset, item, itemType} = this.props
    const Preview = PreviewMap[itemType]
    if (!this.props.offset || !Preview) return null
    const {x, y} = offset
    const style = {
      transform: `translate(${x}px, ${y}px)`,
    }

    return (
      <div style={style}>
        <Preview {...item} />
      </div>
    )
  }

  render() {
    const {isDragging} = this.props

    if (!isDragging) return null
    return <div style={layerStyle}>{this.getItem()}</div>
  }
}
