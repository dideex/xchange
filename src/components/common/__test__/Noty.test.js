import React from 'react'
import Noty from '../Noty'
import {shallow} from 'enzyme'
import NotyMock from 'noty'

describe('Noty behaviour', () => {
  it('Noty tests', () => {
    const noty = Noty('test text')
    expect(NotyMock).toHaveBeenCalledTimes(1)
  })
})
