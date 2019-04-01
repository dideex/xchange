import React from 'react'
import Component from '../InputField'
import {mount} from 'enzyme'
import {wrapInTestContext} from '../../../helpers/dnd'
import {fakeCurrnecy, fakeUser} from '../../../helpers/fixtures'
import CashStore from '../../../store/Cash'

jest.mock('../../Api', () => ({
  post: () => Promise.resolve({data: {}}),
  get: () => Promise.resolve({data: {}, eth: {}}),
  errorEmitter: fn => data => fn(data),
}))

jest.mock('../../common/Noty.js', () => ({
  noty: () => {},
}))

describe('Coverter: Currency badge tests', () => {
  let cashStore
  beforeEach(() => {
    cashStore = new CashStore()
  })
  const props = {
    inputValue: '10',
    currencyId: 0,
    changeInput: () => {},
    onSelectChange: () => {},
  }
  describe('Markup', () => {
    it('Basic markup', () => {
      const WrappedComponent = wrapInTestContext(Component)
      const wrapper = mount(<WrappedComponent {...props} cashStore={cashStore} />)

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Currency icon should be', () => {
      const WrappedComponent = wrapInTestContext(Component)
      cashStore.currency = fakeCurrnecy
      const wrapper = mount(<WrappedComponent {...props} cashStore={cashStore} />)

      expect(wrapper.html()).toMatchSnapshot()
    })

    describe('Dropdown behaviour', () => {
      it('Dropdown should open', () => {
        const WrappedComponent = wrapInTestContext(Component)
        cashStore.currency = fakeCurrnecy
        const wrapper = mount(<WrappedComponent {...props} cashStore={cashStore} />)
        wrapper.find('CurrencySelect').simulate('mouseenter')

        expect(wrapper.find('InputField').instance().state.open).toBeTruthy()
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('Dropdown should close', () => {
        const WrappedComponent = wrapInTestContext(Component)
        cashStore.currency = fakeCurrnecy
        const wrapper = mount(<WrappedComponent {...props} cashStore={cashStore} />)
        wrapper.find('CurrencySelect').simulate('mouseenter')

        wrapper
          .find('InputField > div')
          .first()
          .simulate('mouseleave')

        expect(wrapper.find('InputField').instance().state.open).toBeFalsy()
        expect(wrapper.html()).toMatchSnapshot()
      })
    })
  })

  describe('Handlers should invoke', () => {
    it('Change input handler should ivoke', () => {
      const changeInput = jest.fn()
      const WrappedComponent = wrapInTestContext(Component)
      cashStore.currency = fakeCurrnecy
      const wrapper = mount(
        <WrappedComponent {...props} cashStore={cashStore} changeInput={changeInput} />,
      )

      wrapper.find('input').simulate('change', {target: {value: fakeUser.username}})

      expect(changeInput).toHaveBeenCalledTimes(1)
      expect(changeInput).toHaveBeenCalledWith(fakeUser.username)
    })

    it('Select change handler should ivoke', () => {
      const onSelectChange = jest.fn()
      const WrappedComponent = wrapInTestContext(Component)
      cashStore.currency = fakeCurrnecy
      const wrapper = mount(
        <WrappedComponent
          {...props}
          cashStore={cashStore}
          onSelectChange={onSelectChange}
        />,
      )

      wrapper.find('CurrencySelect').simulate('mouseenter')
      wrapper
        .find('CurrencySelect .dropdown__content Label')
        .first()
        .simulate('click')

      expect(onSelectChange).toHaveBeenCalledTimes(1)
      expect(onSelectChange).toHaveBeenCalledWith(fakeCurrnecy[0].id)
    })
  })

  describe('Drag and drop behaviour', () => {
    // TODO: add react dnd implementation
    // https://github.com/react-dnd/react-dnd/blob/fd1bae42a9/packages/dnd-core/src/__tests__/DragDropMonitor.spec.ts
    it.skip('Inputs should change styles when dragging', () => {
      const WrappedComponent = wrapInTestContext(Component)
      cashStore.currency = fakeCurrnecy
      const wrapper = mount(<WrappedComponent {...props} cashStore={cashStore} />)
      const backend = wrapper
        .instance()
        .getManager()
        .getBackend()
      backend.simulateBeginDrag([null])
      backend.simulateEndDrag()
      console.log('TCL: backend', backend)
      // console.log(wrapper.debug())
      // backend.simulateBeginDrag([
      //   wrapper
      //     .find('DragSource(CurrencyBadge)')
      //     .instance()
      //     .getHandlerId(),
      // ])
    })
  })
})

/* 

const WrappedComponent = wrapInTestContext(Component)

      const wrapper = mount(<WrappedComponent name="Ethereum" id={123} icon="Ethereum" />)

      const backend = wrapper
        .instance()
        .getManager()
        .getBackend()
  
      const backend = wrapper
        .instance()
        .getManager()
        .getBackend()

  // Test that the opacity is 1
  let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div')
  expect(div.props.style.opacity).toEqual(1)

  // Find the drag source ID and use it to simulate the dragging operation
  const box = TestUtils.findRenderedComponentWithType(root, Box)
  backend.simulateBeginDrag([box.getHandlerId()])

  // Verify that the div changed its opacity
  div = TestUtils.findRenderedDOMComponentWithTag(root, 'div')
  expect(div.style.opacity).toEqual(0.4)
  */
