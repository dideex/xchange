import React from 'react'
import Colors from './Colors'

// Svg component;
export const Icons = ({id, style = {}}) => {
  if (!id) return null
  const entities = {
    chevron: (
      <svg style={style} version="1.1" x="0px" y="0px" viewBox="0 0 400 400">
        <path
          style={{fill: Colors.accent}}
          d="M184.9,344.1L8.2,167.4c-8.5-8.5-8.5-22.3,0-30.9l20.6-20.6c8.5-8.5,22.3-8.5,30.8,0l140.7,140.1l140.7-140.1
   c8.5-8.5,22.3-8.5,30.8,0l20.6,20.6c8.5,8.5,8.5,22.3,0,30.9L215.8,344.1C207.3,352.6,193.5,352.6,184.9,344.1L184.9,344.1z"
        />
      </svg>
    ),
  }

  return entities[id] || <text>{id}</text>
}

export default Icons
