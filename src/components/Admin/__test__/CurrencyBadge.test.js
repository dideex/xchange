import React from 'react'
import Component from '../CurrencyBadge'
import {mount, shallow} from 'enzyme'
import Api from '../../../components/Api'
import {delay} from '../../../helpers'
import Common from '../../common'

jest.mock('../../../components/Api', () => ({
  post: () => {},
  get: () => {},
  errorEmitter: jest.fn(data => fn => data(fn)),
}))

jest.mock('../../../components/common', () => ({
  noty: () => {},
}))

const fakeData = {name: 'Test name', price_usd: 'Test usd price', token: 'fakeToken'}
const fakeToken = 'Fake token'
const fakeValue = 'Test value'

describe('Tests', () => {
  describe('Markup', () => {
    it('Base markup', () => {
      const data = {}
      const wrapper = shallow(<Component data={data} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Data markup', () => {
      const data = fakeData
      const wrapper = shallow(<Component data={data} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Data markup opened', () => {
      const data = fakeData
      const wrapper = shallow(<Component data={data} />)
      wrapper.simulate('click')

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('State behavriour', () => {
    it('Should open after click', () => {
      const data = fakeData
      const wrapper = shallow(<Component data={data} />)
      wrapper.simulate('click')

      expect(wrapper.state().show).toBeTruthy()
    })

    it('Reserved should change', () => {
      const data = fakeData
      const wrapper = shallow(<Component data={data} />)
      wrapper.simulate('click')

      wrapper
        .find('input[name="reserved"]')
        .simulate('change', {target: {value: fakeValue, name: 'reserved'}})
      expect(wrapper.state().reserve).toBe(fakeValue)
    })

    it('Source should change', () => {
      const data = fakeData
      const wrapper = shallow(<Component data={data} />)
      wrapper.simulate('click')

      wrapper
        .find('input[name="source"]')
        .simulate('change', {target: {value: fakeValue, name: 'source'}})
      expect(wrapper.state().source).toBe(fakeValue)
    })

    it('Minimal should change', () => {
      const data = fakeData
      const wrapper = shallow(<Component data={data} />)
      wrapper.simulate('click')

      wrapper
        .find('input[name="minimal"]')
        .simulate('change', {target: {value: fakeValue, name: 'minimal'}})
      expect(wrapper.state().minimal).toBe(fakeValue)
    })
  })

  describe('Post behaviour', () => {
    it('Post handler should be invoked by button click', () => {
      const wrapper = shallow(<Component data={fakeData} />)
      wrapper.instance()._pushSettings = jest.fn()
      wrapper.simulate('click')
      wrapper.find('button').simulate('click')

      expect(wrapper.instance()._pushSettings).toHaveBeenCalledTimes(1)
    })

    it('Post handler should be invoked by button click', async () => {
      Api.post = jest.fn(() => Promise.resolve())
      const wrapper = shallow(<Component data={fakeData} token={fakeToken} />)
      wrapper.simulate('click')
      wrapper.find('button').simulate('click')
      await delay()

      const {reserve, minimal, source} = wrapper.state()
      const predictedData = {
        _id: fakeData.id,
        reserve,
        minimal,
        source,
      }

      expect(Api.post).toHaveBeenCalledTimes(1)
      expect(Api.post).toHaveBeenCalledWith(
        'setCurrencyOptions',
        predictedData,
        fakeToken,
      )
    })

    it('Post handler should be get value from the inputs', async () => {
      Api.post = jest.fn(() => Promise.resolve())

      const wrapper = shallow(<Component data={fakeData} token={fakeToken} />)
      wrapper.simulate('click')

      wrapper
        .find('input[name="reserved"]')
        .simulate('change', {target: {value: fakeValue, name: 'reserved'}})

      wrapper
        .find('input[name="source"]')
        .simulate('change', {target: {value: fakeValue, name: 'source'}})

      wrapper
        .find('input[name="minimal"]')
        .simulate('change', {target: {value: fakeValue, name: 'minimal'}})
      wrapper.find('button').simulate('click')
      await delay()

      const {reserve, minimal, source} = wrapper.state()
      const predictedData = {
        _id: fakeData.id,
        reserve,
        minimal,
        source,
      }

      expect(Api.post).toHaveBeenCalledTimes(1)
      expect(Api.post).toHaveBeenCalledWith(
        'setCurrencyOptions',
        predictedData,
        fakeToken,
      )
    })

    it('Noty should be invoked when data has sent', async () => {
      Common.noty = jest.fn()
      Api.post = jest.fn(() => Promise.resolve())
      const wrapper = shallow(<Component data={fakeData} />)
      wrapper.simulate('click')
      wrapper.find('button').simulate('click')

      await delay()
      expect(Common.noty).toHaveBeenCalledTimes(1)
      expect(Common.noty).toHaveBeenCalledWith('Сохранено')
    })

    it('Event emitter should be invoked when data has sent', async () => {
      Api.post = jest.fn(() => Promise.resolve())
      Api.errorEmitter = jest.fn()
      const wrapper = shallow(<Component data={fakeData} />)
      wrapper.simulate('click')
      wrapper.find('button').simulate('click')

      await delay()
      expect(Api.errorEmitter).toHaveBeenCalledTimes(1)
    })
  })
})
