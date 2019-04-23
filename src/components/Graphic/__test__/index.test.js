import React from 'react'
import Component from '../index'
import {shallow} from 'enzyme'
import {mountWithIntl} from '../../../helpers/intl'

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

describe('Graphic: index tests', () => {
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
    const wrapper = mountWithIntl(<Component />)
    it('Basic markup', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
