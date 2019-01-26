import React from 'react'
import {Virtualized} from '../Virtualized'
import {mount} from 'enzyme'
import {StaticRouter} from 'react-router-dom'

describe('Virtualized tests', () => {
  it('Base markup', () => {
    const wrapper = mount(
      <StaticRouter location='/' context={{}}>
        <Virtualized />
      </StaticRouter>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
})
