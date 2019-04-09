import React from 'react'
import Component from '../CommonLinks'

import {mountWrap} from '../../../helpers/router-intl-context'

describe('Navigation: common links tests', () => {
  describe('Markup', () => {
    it('Basic markup', () => {
      const handleClick = () => {}
      const wrapper = mountWrap(<Component handleClick={handleClick} />)

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('Component behavriour', () => {
    it('Handle click should invoke after clicking at home link', () => {
      const handleClick = jest.fn(() => {})
      const wrapper = mountWrap(<Component handleClick={handleClick} />)

      wrapper
        .find('[href="/"]')
        .simulate('click')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
    it('Handle click should invoke after clicking at reserves link', () => {
      const handleClick = jest.fn(() => {})
      const wrapper = mountWrap(<Component handleClick={handleClick} />)

      wrapper
        .find('[href="/reservi"]')
        .simulate('click')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
    it('Handle click should invoke after clicking at about us link', () => {
      const handleClick = jest.fn(() => {})
      const wrapper = mountWrap(<Component handleClick={handleClick} />)

      wrapper
        .find('[href="/o-nas"]')
        .simulate('click')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
    it('Handle click should invoke after clicking at faq link', () => {
      const handleClick = jest.fn(() => {})
      const wrapper = mountWrap(<Component handleClick={handleClick} />)

      wrapper
        .find('[href="/faq"]')
        .simulate('click')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
