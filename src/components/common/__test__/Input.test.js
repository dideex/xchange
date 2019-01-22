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
  const testPhone = '89148906030'
  const testCardNumber = '1234123443214321'

  describe('Markups', () => {
      it('markup', () => {
        const wrapper = shallow(<Component handleChange={() => {}} />)
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('markup value', () => {
        const wrapper = shallow(<Component handleChange={() => {}} value="My value" />)
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('markup is invalid', () => {
        const wrapper = shallow(<Component handleChange={() => {}} isInvalid />)
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('markup with error message', () => {
        const wrapper = shallow(<Component handleChange={() => {}} isInvalid errorMsg="Test message" />)
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('markup with placeholder', () => {
        const wrapper = shallow(<Component handleChange={() => {}} placeholder="Test placeholder" />)
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('markup with custom styles', () => {
        const wrapper = shallow(<Component handleChange={() => {}} style={{"testprop": "testKey"}} />)
        expect(wrapper.html()).toMatchSnapshot()
      })
  })

  describe('Values behaviour', () => {
    it('Value should be', () => {
      const wrapper = shallow(<Component handleChange={() => {}} value={testValue} />)
      expect(wrapper.html()).toContain(testValue)
    })

    it('Custom onBlur handler', () => {
      const onBlur = jest.fn()
      const wrapper = mount(<Component handleChange={() => {}} onBlur={onBlur} />)
      wrapper.find('input').simulate('blur')
      expect(onBlur).toHaveBeenCalledTimes(1)
    })

    it('Custom enter press event', () => {
      const handleEnterPress = jest.fn()
      const wrapper = mount(<Component handleChange={() => {}} handleEnterPress={handleEnterPress} />)
      wrapper.find('input').simulate('keypress', {which: 13})
      expect(handleEnterPress).toHaveBeenCalledTimes(1)
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
        expect(instance.mask).toMatchSnapshot()
      })

      it('Validate with mask unvalidation currencies', () => {
        const toggle = jest.fn()
        const hanldeErrorChange = jest.fn()
        WAValidator.validate = jest.fn(() => true)
        const wrapper = mount(
          <Component
            handleErrorChange={hanldeErrorChange}
            mask="LSK"
            handleChange={toggle}
            value="Not used value"
          />,
        )
        const instance = wrapper.instance()
        instance.handleChange({target: {value: testValue}})
        expect(WAValidator.validate).toHaveBeenCalledTimes(0)
        expect(hanldeErrorChange).toHaveBeenCalledTimes(0)
        expect(instance._validateWithMask(testValue, () => {})).toBe(testValue)
        expect(instance.mask).toMatchSnapshot()
      })

      it('Validate with mask phone', () => {
        const toggle = jest.fn()
        const hanldeErrorChange = jest.fn()
        WAValidator.validate = jest.fn(() => true)
        const wrapper = mount(
          <Component
            handleErrorChange={hanldeErrorChange}
            mask="phone"
            handleChange={toggle}
            value="Not used value"
          />,
        )
        const instance = wrapper.instance()
        instance.handleChange({target: {value: testValue}})
        expect(WAValidator.validate).toHaveBeenCalledTimes(0)
        expect(hanldeErrorChange).toHaveBeenCalledTimes(1)
        expect(hanldeErrorChange).toHaveBeenCalledWith(true, expect.anything())
        expect(instance._validateWithMask(testValue, () => {})).toMatchSnapshot()
        expect(instance.mask).toMatchSnapshot()
      })

      it('Validate card with pattern', () => {
        const toggle = jest.fn()
        const hanldeErrorChange = jest.fn()
        WAValidator.validate = jest.fn(() => true)
        const wrapper = mount(
          <Component
            handleErrorChange={hanldeErrorChange}
            mask="RUR"
            handleChange={toggle}
            value="Not used value"
            pattern="\d+"
          />,
        )
        const instance = wrapper.instance()
        instance.handleChange({target: {value: testCardNumber}})
        expect(WAValidator.validate).toHaveBeenCalledTimes(0)
        expect(hanldeErrorChange).toHaveBeenCalledTimes(1)
        expect(hanldeErrorChange).toHaveBeenCalledWith(false, expect.anything())
        expect(instance._validateWithMask(testCardNumber, () => {})).toMatchSnapshot()
        expect(instance.mask).toMatchSnapshot()
      })

      it('Validate card with pattern crash test', () => {
        const toggle = jest.fn()
        const hanldeErrorChange = jest.fn()
        const wrapper = mount(
          <Component
            handleErrorChange={hanldeErrorChange}
            mask="RUR"
            handleChange={toggle}
            value="Not used value"
            pattern="\d+"
          />,
        )
        const instance = wrapper.instance()
        expect(instance._validateWithMask('1234123412341234', () => {})).toMatchSnapshot()
        expect(instance._validateWithMask('12344321', () => {})).toMatchSnapshot()
        expect(instance._validateWithMask('12345678912345678123456', () => {})).toMatchSnapshot()
      })

      it('Validate phone with pattern', () => {
        const toggle = jest.fn()
        const hanldeErrorChange = jest.fn()
        WAValidator.validate = jest.fn(() => true)
        const wrapper = mount(
          <Component
            handleErrorChange={hanldeErrorChange}
            mask="phone"
            handleChange={toggle}
            value="Not used value"
            pattern="\d+"
          />,
        )
        const instance = wrapper.instance()
        instance.handleChange({target: {value: testPhone}})
        expect(WAValidator.validate).toHaveBeenCalledTimes(0)
        expect(hanldeErrorChange).toHaveBeenCalledTimes(1)
        expect(hanldeErrorChange).toHaveBeenCalledWith(false, expect.anything())
        expect(instance._validateWithMask(testPhone, () => {})).toMatchSnapshot()
        expect(instance.mask).toMatchSnapshot()
      })

      it('Validate phone with pattern crash test', () => {
        const toggle = jest.fn()
        const hanldeErrorChange = jest.fn()
        const wrapper = mount(
          <Component
            handleErrorChange={hanldeErrorChange}
            mask="phone"
            handleChange={toggle}
            value="Not used value"
            pattern="\d+"
          />,
        )
        const instance = wrapper.instance()
        expect(instance._validateWithMask('8914890300000', () => {})).toMatchSnapshot()
        expect(instance._validateWithMask('891489442', () => {})).toMatchSnapshot()
        expect(instance._validateWithMask('891489', () => {})).toMatchSnapshot()
      })
    })
    describe('Input formatt', () => {
      it('Phone format', () => {
        const wrapper = mount(
          <Component
            mask="phone"
            handleChange={() => {}}
            value=""
            pattern="\d+"
          />,
        )
        const instance = wrapper.instance()
        expect(instance._format('89148906034', () => {})).toMatchSnapshot()
        expect(instance._format('8914890603489148906034', () => {})).toMatchSnapshot()
        expect(instance._format('89148', () => {})).toMatchSnapshot()
        expect(instance._format('89148qwer', () => {})).toMatchSnapshot()
        expect(instance._format('89 1 48 906 0 34', () => {})).toMatchSnapshot()
      })

      it('Phone clean', () => {
        const wrapper = mount(
          <Component
            mask="phone"
            handleChange={() => {}}
            value=""
            pattern="\d+"
          />,
        )
        const instance = wrapper.instance()
        expect(instance._clean('8914_890_6034', () => {})).toMatchSnapshot()
        expect(instance._clean('891_48906034_891489_06034', () => {})).toMatchSnapshot()
        expect(instance._clean('8_9148', () => {})).toMatchSnapshot()
        expect(instance._clean('891_48_qwer', () => {})).toMatchSnapshot()
        expect(instance._clean('8_9 1 48_ 906 0 34', () => {})).toMatchSnapshot()
      })

      it('Card format', () => {
        const wrapper = mount(
          <Component
            mask="Btc"
            handleChange={() => {}}
            value=""
            pattern="\d+"
          />,
        )
        const instance = wrapper.instance()
        expect(instance._format('1234432164316423', () => {})).toMatchSnapshot()
        expect(instance._format('12344321643164231234432164316423', () => {})).toMatchSnapshot()
        expect(instance._format('12344321', () => {})).toMatchSnapshot()
        expect(instance._format('12344321qwe', () => {})).toMatchSnapshot()
        expect(instance._format('12 34 432 164 3164 23', () => {})).toMatchSnapshot()
      })

      it('Card clean', () => {
        const wrapper = mount(
          <Component
            mask="Btc"
            handleChange={() => {}}
            value=""
            pattern="\d+"
          />,
        )
        const instance = wrapper.instance()
        expect(instance._format('1_2344_32_1643_164_23', () => {})).toMatchSnapshot()
        expect(instance._format('1234_432__16431_6423123_443216_4316423', () => {})).toMatchSnapshot()
        expect(instance._format('12_3443_21', () => {})).toMatchSnapshot()
        expect(instance._format('123_4432_1qw_e', () => {})).toMatchSnapshot()
        expect(instance._format('1_2 34 43__ 1_64 3_164 _23', () => {})).toMatchSnapshot()
      })
    })
  })
})
