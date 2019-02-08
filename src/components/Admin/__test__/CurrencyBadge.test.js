import React from 'react'
import Component from '../CurrencyBadge'
import {shallow, mount} from 'enzyme'

jest.mock('../../../components/Api', () => ({
  post: () => {},
  get: () => {},
  errorEmitter: jest.fn(data => fn => data(fn)),
}))

jest.mock('../../../components/common', () => ({
  noty: () => {},
}))

const fakeData = {name: 'Test name', price_usd: 'Test usd price'}

describe('Tests', () => {
  describe('Markup', () => {
    it('Base markup', () => {
      const data = {}
      const wrapper = mount(<Component data={data} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Data markup', () => {
      const data = fakeData
      const wrapper = mount(<Component data={data} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Data markup opened', () => {
      const data = fakeData
      const wrapper = mount(<Component data={data} />)
      wrapper.simulate('click')

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('State behavriour', () => {
    it('Should open after click', () => {
      const data = fakeData
      const wrapper = mount(<Component data={data} />)
      wrapper.simulate('click')

      expect(wrapper.state().show).toBeTruthy()
    })

    it('Reserved should change', () => {
      const data = fakeData
      const wrapper = mount(<Component data={data} />)
      wrapper.simulate('click')

      wrapper.find('input').at(0).simulate('change', {target: {value: 'testInput'}})
      console.log(wrapper.state())
    })
  })
})
