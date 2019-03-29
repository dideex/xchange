import React, {Component} from 'react'
import {DragLayer} from 'react-dnd'
import BudgePreview from './controls/BudgeDragPrview'

const layerStyle = {
  position: 'fixed',
  pointerEvents: 'none',
  left: -28,
  top: -28,
  width: '50px',
  heigth: '50px',
  zIndex: 1000,
}

const PreviewMap = {
  cash: BudgePreview,
}

const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  isDragging: monitor.isDragging(),
  offset: monitor.getSourceClientOffset(),
})

// FIXME: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
// Custom dragging layer
class CustomDragLayer extends Component {
  constructor(props) {
    super(props)
    this.lastUpdate = +new Date()
    this.updateTimer = null
  }

  // Don't rerender component less then 50 times in a second
  shouldComponentUpdate() {
    // FIXME: Not tested
    if (+new Date() - this.lastUpdate <= 32) {
      this.lastUpdate = +new Date()
      clearTimeout(this.updateTimer)
      return true
    } else {
      this.updateTimer = setTimeout(() => {
        this.forceUpdate()
      }, 100)
    }
    return false
  }

  getItemStyle(props) {
    if (!props.offset) return {display: 'none'}
    const {
      offset,
      item: {
        cursorPosition: {dragX, dragY},
      },
    } = props
    let {x, y} = offset
    const transform = `translate(${x + dragX}px, ${y + dragY}px)`
    return {
      ...layerStyle,
      transform,
      WebkitTransform: transform,
    }
  }

  getItem() {
    const {itemType} = this.props
    const Preview = PreviewMap[itemType]
    return <Preview {...this.props.item} />
  }

  render() {
    const {isDragging} = this.props
    if (!isDragging) return null
    return <div style={this.getItemStyle(this.props)}>{this.getItem()}</div>
  }
}

export const UndecoratedCustomDragLayer = CustomDragLayer
export default DragLayer(collect)(CustomDragLayer)