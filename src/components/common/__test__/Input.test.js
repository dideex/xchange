import React from 'react'
import Component from '../Input'
import {shallow, mount, render} from 'enzyme'
import WAValidator from 'coin-address-validator'

jest.mock('coin-address-validator', () => ({
  validate: () => {},
}))

describe('Input behaviour', () => {
  const testValue = 'Test value'
  const fakeMask = 'Btc'

  it('markup', () => {
    const wrapper = shallow(<Component handleChange={() => {}} />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('Values behaviour', () => {
    it('Value should be', () => {
      const wrapper = shallow(<Component handleChange={() => {}} value={testValue} />)
      expect(wrapper.html()).toContain(testValue)
    })

    it('handleChange should be invoked on form change', async () => {
      const toggle = jest.fn()
      const wrapper = mount(<Component handleChange={toggle} value="" />)
      wrapper.find('input').simulate('change', {target: {value: testValue}})
      expect(toggle).toHaveBeenCalledTimes(1)
      expect(toggle).toHaveBeenCalledWith(testValue)
    })

    it('Get value from input first', async () => {
      const toggle = jest.fn()
      const wrapper = mount(<Component handleChange={toggle} value="Not used value" />)
      const instance = wrapper.instance()
      instance.handleChange({target: {value: testValue}})
      expect(toggle).toHaveBeenCalledTimes(1)
      expect(toggle).toHaveBeenCalledWith(testValue)
    })

    describe('Input validation', () => {
      it('Validate with mask success', () => {
        const toggle = jest.fn()
        const hanldeErrorChange = jest.fn()
        WAValidator.validate = jest.fn(() => true)
        const wrapper = mount(
          <Component
            handleErrorChange={hanldeErrorChange}
            mask={fakeMask}
            handleChange={toggle}
            value="Not used value"
          />,
        )
        const instance = wrapper.instance()
        instance.handleChange({target: {value: testValue}})
        expect(WAValidator.validate).toHaveBeenCalledTimes(1)
        expect(WAValidator.validate).toHaveBeenCalledWith(testValue, 'Btc')
        expect(hanldeErrorChange).toHaveBeenCalledTimes(1)
        expect(hanldeErrorChange).toHaveBeenCalledWith(false, expect.anything())
        expect(instance._validateWithMask(testValue, () => {})).toBe(testValue)
      })
    })
  })
})
