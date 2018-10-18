import React from 'react'
import Icon from '../../common/CurrencyIcons'

// BudgeDragPrview component;
export const BudgeDragPrview = props => {
  const {name} = props
  return (
    <div>
      <Icon id={name} />
    </div>
  )
}

export default BudgeDragPrview
