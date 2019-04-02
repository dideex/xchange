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
    describe('Currency filter', () => {
      const wrapper = mountWithIntl(<Component {...props} />)
      it('Should find a bitcoin', () => {
        wrapper.find('input').simulate('change', {target: {value: fakeCurrnecy[0].name}})
        expect(wrapper.find('[data-testid="currency-badge-item"]').length).toBe(2)
      })
      it('Should find a tether', () => {
        wrapper.find('input').simulate('change', {target: {value: fakeCurrnecy[1].name}})
        expect(wrapper.find('[data-testid="currency-badge-item"]').length).toBe(2)
      })
    })
    describe('Icon drag behavriour', () => {
      const {x, y} = coordinates
      const wrapper = mountWithIntl(<Component {...props} />)
      it('Should handle coordinates on 5 10', () => {
        wrapper
          .find('[data-testid="currency-badge-item"]')
          .first()
          .simulate('mousedown', {
            clientX: 0,
            clientY: 0,
            target: {
              getBoundingClientRect: () => ({x, y}),
            },
          })
        expect(wrapper.find('CurrencyDNDArea').instance().state).toEqual({
          dragX: 5,
          dragY: 10,
          search: '',
        })
      })
      it('Should handle coordinates on 25 40', () => {
        wrapper
          .find('[data-testid="currency-badge-item"]')
          .first()
          .simulate('mousedown', {
            clientX: 0,
            clientY: 0,
            target: {
              getBoundingClientRect: () => ({x: 24, y: 40}),
            },
          })
        expect(wrapper.find('CurrencyDNDArea').instance().state).toEqual({
          dragX: -9,
          dragY: -25,
          search: '',
        })
      })
      it('Should handle coordinates on 5 10 and custom client x, y', () => {
        wrapper
          .find('[data-testid="currency-badge-item"]')
          .first()
          .simulate('mousedown', {
            clientX: 10,
            clientY: 10,
            target: {
              getBoundingClientRect: () => ({x: 5, y: 10}),
            },
          })
        expect(wrapper.find('CurrencyDNDArea').instance().state).toEqual({
          dragX: 20,
          dragY: 15,
          search: '',
        })
      })
      it('Should handle coordinates on 25 40 and custom client x, y', () => {
        wrapper
          .find('[data-testid="currency-badge-item"]')
          .first()
          .simulate('mousedown', {
            clientX: 10,
            clientY: 10,
            target: {
              getBoundingClientRect: () => ({x: 25, y: 40}),
            },
          })
        expect(wrapper.find('CurrencyDNDArea').instance().state).toEqual({
          dragX: 0,
          dragY: -15,
          search: '',
        })
      })
    })
  })
})
