import React from 'react'
import Component from '../index'

import {mountWrap} from '../../../helpers/router-intl-context'
import Utils from '../../common/Utils'

jest.mock('../../common/Utils', () => ({
  ScrollTo: () => Promise.resolve({data: {}}),
}))

describe('Header', () => {
  const wrapper = mountWrap(<Component />)
  it('Basic markup', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('Should scroll on button click', () => {
    // wrapper.find()
    Utils.ScrollTo = jest.fn()

    const wrapperInstance = wrapper.instance()

    const getBoundingClientRect = jest.fn(() => ({top: 100}))
    document.querySelector = () => ({
      getBoundingClientRect,
    })

    wrapper.find('AccentButton').simulate('click')

    expect(Utils.ScrollTo).toHaveBeenCalledTimes(1)
    expect(getBoundingClientRect).toHaveBeenCalledTimes(1)
  })
})
