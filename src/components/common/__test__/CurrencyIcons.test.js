import React from 'react'
import Component from '../CurrencyIcons'
import {shallow} from 'enzyme'

describe('Currency icon tests', () => {
  describe('Icon props', () => {
    it('Empty icon', () => {
      const wrapper = shallow(<Component />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Custom style', () => {
      const wrapper = shallow(<Component id="Bitcoin" style={{test: 'Test prop'}} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Custom classname', () => {
      const wrapper = shallow(<Component id="Bitcoin" className="Test className" />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Icons', () => {
    it('Bitcoin icon', () => {
      const wrapper = shallow(<Component id="Bitcoin" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Ethereum icon', () => {
      const wrapper = shallow(<Component id="Ethereum" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Dash icon', () => {
      const wrapper = shallow(<Component id="Dash" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('TRON icon', () => {
      const wrapper = shallow(<Component id="TRON" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('EOS icon', () => {
      const wrapper = shallow(<Component id="EOS" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Stellar icon', () => {
      const wrapper = shallow(<Component id="Stellar" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Litecoin icon', () => {
      const wrapper = shallow(<Component id="Litecoin" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('XRP icon', () => {
      const wrapper = shallow(<Component id="XRP" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Tether icon', () => {
      const wrapper = shallow(<Component id="Tether" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('VTB icon', () => {
      const wrapper = shallow(<Component id="VTB" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Alfabank icon', () => {
      const wrapper = shallow(<Component id="Alfabank" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Yandex icon', () => {
      const wrapper = shallow(<Component id="Yandex" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('PMS icon', () => {
      const wrapper = shallow(<Component id="PMS" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Tinkoff icon', () => {
      const wrapper = shallow(<Component id="Tinkoff" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Qiwi icon', () => {
      const wrapper = shallow(<Component id="Qiwi" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Sberbank icon', () => {
      const wrapper = shallow(<Component id="Sberbank" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Zcash icon', () => {
      const wrapper = shallow(<Component id="Zcash" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('OmiseGO icon', () => {
      const wrapper = shallow(<Component id="OmiseGO" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('NEM icon', () => {
      const wrapper = shallow(<Component id="NEM" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Monero icon', () => {
      const wrapper = shallow(<Component id="Monero" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Dogecoin icon', () => {
      const wrapper = shallow(<Component id="Dogecoin" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Lisk icon', () => {
      const wrapper = shallow(<Component id="Lisk" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('IOTA icon', () => {
      const wrapper = shallow(<Component id="IOTA" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Cardano icon', () => {
      const wrapper = shallow(<Component id="Cardano" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Dollar icon', () => {
      const wrapper = shallow(<Component id="Dollar" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Ruble icon', () => {
      const wrapper = shallow(<Component id="Ruble" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Euro icon', () => {
      const wrapper = shallow(<Component id="Euro" />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
