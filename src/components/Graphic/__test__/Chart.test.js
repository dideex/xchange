import React from 'react'
import Component from '../Chart'
import {shallow} from 'enzyme'
import {delay} from '../../../helpers'

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

describe('Graphic: chart tests', () => {
  const fetch = () =>
    Promise.resolve({
      json() {
        return {
          values: [
            {x: new Date().setDate(1), y: 10},
            {x: new Date().setDate(2), y: 20},
            {x: new Date().setDate(3), y: 30},
            {x: new Date().setDate(4), y: 5},
          ],
        }
      },
    })
  window.fetch = fetch
  describe('Markup', () => {
    const wrapper = shallow(<Component />)
    it('Basic markup', async () => {
      wrapper.instance().setState({loading: false})

      await delay()
      expect(wrapper.html()).toMatchSnapshot()
    })
    it('Loading', () => {
      wrapper.instance().setState({loading: true})

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('Component behaviour', () => {
    it('cDM shoulf fetch data', () => {
      const mockFetch = jest.fn(() =>
        Promise.resolve({
          json() {
            return {
              values: [{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 30}, {x: 5, y: 5}],
            }
          },
        }),
      )
      window.fetch = mockFetch
      const wrapper = shallow(<Component />)

      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.blockchain.info/charts/market-price?cors=true&timespan=30days&format=json&lang=ru',
      )
    })
  })
})
