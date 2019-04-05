import React from 'react'
import Component from '../index'

import {mountWrap} from '../../../helpers/router-intl-context'
import Utils from '../../common/Utils'

jest.mock('../../common/Utils', () => ({
  ScrollTo: () => Promise.resolve({data: {}}),
}))

describe('Header', () => {
  const wrapper = mountWrap(
    <div>
      <Component />
      <main />
    </div>,
  )
  it('Basic markup', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it.only('Should scroll on button click', () => {
    // wrapper.find()
    Utils.ScrollTo = jest.fn()

    const wrapperInstance = wrapper.instance()
    const main = {
      getBoundingClientRect() {
        return {top: 100}
      },
    }
    const node = {
      querySelector: v => {
        console.log(v)
        return (v === 'main' ? main : null)},
    }
    wrapperInstance.node = node

    wrapper.find('AccentButton').simulate('click')

    expect(Utils.ScrollTo).toHaveBeenCalledTimes(1)
  })
})
