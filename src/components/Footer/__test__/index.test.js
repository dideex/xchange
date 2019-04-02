import React from 'react'
import Component from '../index'
import {shallow} from 'enzyme'
import {mountWithIntl} from '../../../helpers/intl'
import {fakeUser} from '../../../helpers/fixtures'
import Api from '../../Api'
import {delay} from '../../../helpers'

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

describe('Footer tests', () => {
  describe('Markup', () => {
    const wrapper = mountWithIntl(<Component />)
    it('Basic markup', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
    it('Loading markup', () => {
      wrapper.find('Footer').setState({loading: true})
      expect(wrapper.html()).toMatchSnapshot()
    })
    it('Email should change', () => {
      wrapper
        .find('input[placeholder="Email"]')
        .simulate('change', {target: {value: fakeUser.email}})
      expect(wrapper.find('InputComponent[placeholder="Email"]').html()).toMatchSnapshot()
    })
    it('Email should show an error after enter wrong email', () => {
      wrapper
        .find('input[placeholder="Email"]')
        .simulate('change', {target: {value: fakeUser.email + '@'}})
      expect(wrapper.find('InputComponent[placeholder="Email"]').html()).toMatchSnapshot()
    })
    it('Phone should change', () => {
      wrapper
        .find('input[placeholder="Phone"]')
        .simulate('change', {target: {value: fakeUser.phone}})
      expect(wrapper.find('InputComponent[placeholder="Phone"]').html()).toMatchSnapshot()
    })
    it('Phone should show an error after enter wrong email', () => {
      wrapper
        .find('input[placeholder="Phone"]')
        .simulate('change', {target: {value: '123'}})
      expect(wrapper.find('InputComponent[placeholder="Phone"]').html()).toMatchSnapshot()
    })
    it('Textarea should change', () => {
      wrapper.find('textarea').simulate('change', {target: {value: fakeUser.username}})
      expect(wrapper.find('textarea').html()).toMatchSnapshot()
    })
  })
  describe('Component behavriour', () => {
    it('Should submit if everything was ok', async () => {
      const wrapper = mountWithIntl(<Component />)
      Api.post = jest.fn(() => Promise.resolve())
      wrapper
        .find('input[placeholder="Email"]')
        .simulate('change', {target: {value: fakeUser.email}})
      wrapper
        .find('input[placeholder="Phone"]')
        .simulate('change', {target: {value: fakeUser.phone}})
      wrapper.find('textarea').simulate('change', {target: {value: fakeUser.username}})
      wrapper.find('button').simulate('click')

      await delay()
      expect(Api.post).toHaveBeenCalledTimes(1)
      expect(Api.post).toHaveBeenCalledWith('sendMessage', {
        email: fakeUser.email,
        message: fakeUser.username,
        phone: "+8(914)-567-89-01"
      })
    })
    it('Should not submit if something was wrong', async () => {
      const wrapper = mountWithIntl(<Component />)
      Api.post = jest.fn(() => Promise.resolve())
      wrapper
        .find('input[placeholder="Email"]')
        .simulate('change', {target: {value: fakeUser.email}})
      wrapper.find('textarea').simulate('change', {target: {value: fakeUser.username}})
      wrapper.find('button').simulate('click')

      await delay()
      expect(Api.post).toHaveBeenCalledTimes(0)
    })
  })
})
