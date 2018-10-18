import React from 'react'
import Icon from '../../common/CurrencyIcons'

// BudgeDragPrview component;
export const BudgeDragPrview = props => {
  const {name} = props
  console.log(" LOG ___ name ", name )
  return (
    <div>
      <Icon id={name} />
    </div>
  )
}

export default BudgeDragPrview
