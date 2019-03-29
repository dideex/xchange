import React from 'react'
import {mount, shallow} from 'enzyme'

import Component from '../ExchangeRate'

describe('Coverter: Exchange rate tests', () => {
  it('Basic markup', () => {
    const props = {
      inputCurrency: '10',
      outputCurrency: '100',
      loading: false,
      rate: 1,
    }
    const wrapper = mount(<Component {...props} />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Loading should render', () => {
    const props = {
      inputCurrency: '10',
      outputCurrency: '100',
      loading: true,
      rate: 1,
    }
    const wrapper = mount(<Component {...props} />)
    expect(wrapper.html()).toMatchSnapshot()
  })
  describe('Rates should changing correct', () => {
    it('Rate: 10, input 10, output 1', () => {
      const props = {
        inputCurrency: '10',
        outputCurrency: '1',
        loading: false,
        rate: 10,
      }
      const wrapper = shallow(<Component {...props} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Rate: 10, input 1, output 10', () => {
      const props = {
        inputCurrency: '1',
        outputCurrency: '10',
        loading: false,
        rate: 10,
      }
      const wrapper = shallow(<Component {...props} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Rate: 20, input 5, output 7', () => {
      const props = {
        inputCurrency: '5',
        outputCurrency: '7',
        loading: false,
        rate: 20,
      }
      const wrapper = shallow(<Component {...props} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Rate: 20, input 7, output 5', () => {
      const props = {
        inputCurrency: '7',
        outputCurrency: '5',
        loading: false,
        rate: 20,
      }
      const wrapper = shallow(<Component {...props} />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
