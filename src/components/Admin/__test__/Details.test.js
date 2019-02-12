import React from 'react'
import Component from '../Details'
import {shallow} from 'enzyme'

const fakeData = {name: 'Test name', price_usd: 'Test usd price', token: 'fakeToken'}

describe('Adming details', () => {
  describe('Markup', () => {
    it('Base markup', () => {
      const wrapper = shallow(<Component date={{}} />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
