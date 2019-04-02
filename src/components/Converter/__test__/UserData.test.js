import React from 'react'
import Component from '../UserData'
import {Provider as MobxProvider} from 'mobx-react'

import CashStore from '../../../store/Cash'
import UserStore from '../../../store/User'
import {mountWrap} from '../../../helpers/router-intl-context'
import {delay} from '../../../helpers'
import {
  fakeCurrnecy,
  fakeUser,
  fakeBitcoinAddress,
  fakeCreditAddress,
} from '../../../helpers/fixtures'

jest.mock('../../../components/Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../../../components/common/Noty.js', () => ({
  noty: () => {},
}))

describe('Converter: user data tests', () => {
  let cashStore = new CashStore()
  let userStore = new UserStore()
  const props = {walletIncome: 0, walletOutgo: 1}
  afterEach(() => {
    cashStore = new CashStore()
    cashStore.currency = fakeCurrnecy
    userStore = new UserStore()
  })

  describe('Mark up', () => {
    const wrapper = mountWrap(
      <MobxProvider userStore={userStore} cashStore={cashStore}>
        <Component {...props} />
      </MobxProvider>,
    )
    it('Basic mark up', () => {
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
    it('Username should change', () => {
      wrapper
        .find('input[placeholder="Full name"]')
        .simulate('change', {target: {value: fakeUser.username}})
      expect(
        wrapper.find('InputComponent[placeholder="Full name"]').html(),
      ).toMatchSnapshot()
    })
    it('Username should show an error if name has lower letters then 2', () => {
      wrapper
        .find('input[placeholder="Full name"]')
        .simulate('change', {target: {value: 'q'}})
      expect(
        wrapper.find('InputComponent[placeholder="Full name"]').html(),
      ).toMatchSnapshot()
    })
    it('First wallet should change', () => {
      wrapper
        .find('input[placeholder="Your  wallet"]')
        .simulate('change', {target: {value: fakeBitcoinAddress}})
      expect(
        wrapper.find('InputComponent[placeholder="Your  wallet"]').html(),
      ).toMatchSnapshot()
    })
    it("First wallet should show an error if wallet's number is wrong", () => {
      wrapper
        .find('input[placeholder="Your  wallet"]')
        .simulate('change', {target: {value: 'q'}})
      expect(
        wrapper.find('InputComponent[placeholder="Your  wallet"]').html(),
      ).toMatchSnapshot()
    })
    it('Second wallet should change', () => {
      wrapper
        .find('input[placeholder="Your wallet for "]')
        .simulate('change', {target: {value: fakeCreditAddress}})
      expect(
        wrapper.find('InputComponent[placeholder="Your wallet for "]').html(),
      ).toMatchSnapshot()
    })
    it("Second wallet should show an error if wallet's number is wrong", () => {
      wrapper
        .find('input[placeholder="Your wallet for "]')
        .simulate('change', {target: {value: 'q'}})
      expect(
        wrapper.find('InputComponent[placeholder="Your wallet for "]').html(),
      ).toMatchSnapshot()
    })
    it('Checkbox should work', () => {
      wrapper.find('label[htmlFor="agree"]').simulate('click')
      expect(wrapper.find('label[htmlFor="agree"]').html()).toMatchSnapshot()
      expect(wrapper.find('UserData').instance().state.agree).toBeTruthy()
    })
    it('Button should be disabled', () => {
      wrapper
        .find('UserData')
        .instance()
        .setState({agree: false})
      expect(wrapper.find('button').html()).toMatchSnapshot()
    })
    it('Button should be available', () => {
      wrapper
        .find('UserData')
        .instance()
        .setState({agree: true})
      expect(wrapper.find('button').html()).toMatchSnapshot()
    })
  })

  describe('Class behaviour', () => {
    it('Should submit when agree is checked', () => {
      const handleSubmit = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore} cashStore={cashStore}>
          <Component {...props} />
        </MobxProvider>,
      )
      wrapper.find('UserData').instance().handleSubmit = handleSubmit
      wrapper.find('label[htmlFor="agree"]').simulate('click')
      wrapper.find('button').simulate('click')
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
    it('Should not submit when agree is not chacked', () => {
      const handleSubmit = jest.fn()
      const wrapper = mountWrap(
        <MobxProvider userStore={userStore} cashStore={cashStore}>
          <Component {...props} />
        </MobxProvider>,
      )
      wrapper.find('UserData').instance().handleSubmit = handleSubmit
      wrapper.find('button').simulate('click')
      expect(handleSubmit).toHaveBeenCalledTimes(0)
    })
    describe('Handle submit behavriour', () => {
      it('Should invoke correctly if everything was ok', async () => {
        const createPayment = jest.fn(() => Promise.resolve())
        const updateInfo = jest.fn(() => Promise.resolve())
        cashStore.createPayment = createPayment
        userStore.updateInfo = updateInfo
        cashStore.currency = fakeCurrnecy
        const wrapper = mountWrap(
          <MobxProvider userStore={userStore} cashStore={cashStore}>
            <Component {...props} />
          </MobxProvider>,
        )
        wrapper
          .find('input[placeholder="Email"]')
          .simulate('change', {target: {value: fakeUser.email}})
        wrapper
          .find('input[placeholder="Full name"]')
          .simulate('change', {target: {value: fakeUser.username}})
        wrapper
          .find(`input[placeholder="Your ${fakeCurrnecy[0].name} wallet"]`)
          .simulate('change', {target: {value: fakeBitcoinAddress}})
        wrapper
          .find(`input[placeholder="Your wallet for ${fakeCurrnecy[2].name}"]`)
          .simulate('change', {target: {value: fakeCreditAddress}})
        wrapper.find('label[htmlFor="agree"]').simulate('click')
        wrapper.find('button').simulate('click')

        await delay()

        expect(createPayment).toHaveBeenCalledTimes(1)
        expect(createPayment).toHaveBeenCalledWith({
          email: fakeUser.email,
          fromWallet: fakeBitcoinAddress,
          toWallet: fakeCreditAddress,
          token: '',
        })
        expect(updateInfo).toHaveBeenCalledTimes(1)
      })
      it('Should not invoke if anything was wrong', async () => {
        const createPayment = jest.fn(() => Promise.resolve())
        const updateInfo = jest.fn(() => Promise.resolve())
        cashStore.createPayment = createPayment
        userStore.updateInfo = updateInfo
        cashStore.currency = fakeCurrnecy
        const wrapper = mountWrap(
          <MobxProvider userStore={userStore} cashStore={cashStore}>
            <Component {...props} />
          </MobxProvider>,
        )
        wrapper
          .find('input[placeholder="Email"]')
          .simulate('change', {target: {value: fakeUser.email}})
        wrapper
          .find('input[placeholder="Full name"]')
          .simulate('change', {target: {value: fakeUser.username}})
        wrapper
          .find(`input[placeholder="Your ${fakeCurrnecy[0].name} wallet"]`)
          .simulate('change', {target: {value: fakeBitcoinAddress}})
        wrapper.find('label[htmlFor="agree"]').simulate('click')
        wrapper.find('button').simulate('click')

        await delay()

        expect(createPayment).toHaveBeenCalledTimes(0)
        expect(updateInfo).toHaveBeenCalledTimes(0)
      })
    })
  })
})
