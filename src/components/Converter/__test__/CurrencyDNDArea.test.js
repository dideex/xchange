import React from 'react'
import Component from '../CurrencyDNDArea'
import {mountWithIntl} from '../../../helpers/intl'
import {fakeCurrnecy} from '../../../helpers/fixtures'

describe('Converter: Currency dnd area', () => {
  const props = {
    currency: fakeCurrnecy,
    loading: false,
  }
  const coordinates = {
    x: 10,
    y: 5,
  }
  describe('Markup', () => {
    it('Basic markup', () => {
      const wrapper = mountWithIntl(<Component {...props} />)
      expect(wrapper.html()).toMatchSnapshot()
    })
    it('Should render spinner when loading', () => {
      const wrapper = mountWithIntl(<Component currency={[]} loading />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('Component behaviour', () => {
    it.only('Should handle coordinates on click', () => {
      const wrapper = mountWithIntl(<Component {...props} />)
      // console.log('TCL: wrapper', wrapper.debug())
      // console.log(wrapper.find('[data-testid="currency-badge-item"]').first().debug())
      wrapper
        .find('[data-testid="currency-badge-item"]')
        .first()
        .simulate('mousedown', {
          currentTarget: {
            getBoundingClientRect() {
              return {
                x: coordinates.x,
                y: coordinates.y,
              }
            },
          },
        })
      console.log(wrapper.find('CurrencyDNDArea').instance().state)
    })
  })
})
