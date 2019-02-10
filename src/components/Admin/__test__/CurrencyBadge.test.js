import React from 'react'
import Component from '../CurrencyBadge'
import {shallow, mount} from 'enzyme'
import Api from '../../../components/Api'
// import Common from '../../common'

jest.mock('../../../components/Api', () => ({
  post: () => {},
  get: () => {},
  errorEmitter: jest.fn(data => fn => data(fn)),
}))

jest.mock('../../../components/common', () => ({
  noty: () => {},
}))

const fakeData = {name: 'Test name', price_usd: 'Test usd price', token: 'fakeToken'}

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
      const fakeValue = 'Test value'
      const data = fakeData
      const wrapper = mount(<Component data={data} />)
      wrapper.simulate('click')

      wrapper
        .find('input[name="reserved"]')
        .simulate('change', {target: {value: fakeValue, name: 'reserved'}})
      expect(wrapper.state().reserve).toBe(fakeValue)
    })

    it('Source should change', () => {
      const fakeValue = 'Test value'
      const data = fakeData
      const wrapper = mount(<Component data={data} />)
      wrapper.simulate('click')

      wrapper
        .find('input[name="source"]')
        .simulate('change', {target: {value: fakeValue, name: 'source'}})
      expect(wrapper.state().source).toBe(fakeValue)
    })

    it('Minimal should change', () => {
      const fakeValue = 'Test value'
      const data = fakeData
      const wrapper = mount(<Component data={data} />)
      wrapper.simulate('click')

      wrapper
        .find('input[name="minimal"]')
        .simulate('change', {target: {value: fakeValue, name: 'minimal'}})
      expect(wrapper.state().minimal).toBe(fakeValue)
    })
  })

  describe('Post behaviour', () => {
    it('Post hanlder should be invoked by button click', () => {
      const wrapper = mount(<Component data={fakeData} />)
      wrapper.instance()._pushSettings = jest.fn()
      wrapper.simulate('click')
      wrapper.find('button').simulate('click')

      expect(wrapper.instance()._pushSettings).toHaveBeenCalledTimes(1)
    })

    it.only('Post hanlder should be invoked by button click', async () => {
      Api.post = jest.fn(() => Promise.resolve())
      const wrapper = mount(<Component data={fakeData} />)
      wrapper.simulate('click')
      // await wrapper.find('button').simulate('click')
      await wrapper.instance()._pushSettings()

      expect(Api.post).toHaveBeenCalledTimes(1)
    })
  })
})
