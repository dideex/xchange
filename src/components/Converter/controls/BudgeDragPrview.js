import React from 'react'
import Icon from '../../common/CurrencyIcons'

// BudgeDragPrview component;
export const BudgeDragPrview = props => {
  const {icon} = props
  return (
    <div>
      <Icon id={icon} />
    </div>
  )
}

export default BudgeDragPrview
