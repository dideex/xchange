import React from 'react'
import {DragDropContext} from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'

export function wrapInTestContext(DecoratedComponent) {
  const TestStub = props => <DecoratedComponent {...props} />
  return DragDropContext(TestBackend)(TestStub)
}
