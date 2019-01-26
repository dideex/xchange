import React from 'react'
import Component from '../Icons'
import {shallow} from 'enzyme'

describe('Icons snapshots', () => {
  describe('Icon props', () => {
    it('Empty icon', () => {
      const wrapper = shallow(<Component />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Custom style', () => {
      const wrapper = shallow(<Component id="chevron" style={{test: 'Test prop'}} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Custom classname', () => {
      const wrapper = shallow(<Component id="chevron" className='Test className' />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Icons', () => {
    it('chevron icon', () => {
      const wrapper = shallow(<Component id="chevron" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('copy icon', () => {
      const wrapper = shallow(<Component id="copy" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('menu icon', () => {
      const wrapper = shallow(<Component id="menu" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('close icon', () => {
      const wrapper = shallow(<Component id="close" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('search icon', () => {
      const wrapper = shallow(<Component id="search" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('user icon', () => {
      const wrapper = shallow(<Component id="user" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('howTo1 icon', () => {
      const wrapper = shallow(<Component id="howTo1" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('howTo2 icon', () => {
      const wrapper = shallow(<Component id="howTo2" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('howTo3 icon', () => {
      const wrapper = shallow(<Component id="howTo3" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('howTo4 icon', () => {
      const wrapper = shallow(<Component id="howTo4" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('logo icon', () => {
      const wrapper = shallow(<Component id="logo" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('manByGraphic icon', () => {
      const wrapper = shallow(<Component id="manByGraphic" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('afterMainBg icon', () => {
      const wrapper = shallow(<Component id="afterMainBg" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('afterFooterBg icon', () => {
      const wrapper = shallow(<Component id="afterFooterBg" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('beforeContactBg icon', () => {
      const wrapper = shallow(<Component id="beforeContactBg" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('afterContactBg icon', () => {
      const wrapper = shallow(<Component id="afterContactBg" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('dollar icon', () => {
      const wrapper = shallow(<Component id="dollar" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('creditCard icon', () => {
      const wrapper = shallow(<Component id="creditCard" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('headerBgTop icon', () => {
      const wrapper = shallow(<Component id="headerBgTop" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('headerBgBottom icon', () => {
      const wrapper = shallow(<Component id="headerBgBottom" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('manAndBasket icon', () => {
      const wrapper = shallow(<Component id="manAndBasket" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('manWithGraphis icon', () => {
      const wrapper = shallow(<Component id="manWithGraphis" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('girlWithCoins icon', () => {
      const wrapper = shallow(<Component id="girlWithCoins" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('safe icon', () => {
      const wrapper = shallow(<Component id="safe" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('manWorking icon', () => {
      const wrapper = shallow(<Component id="manWorking" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('manHappy icon', () => {
      const wrapper = shallow(<Component id="manHappy" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('mrGadget icon', () => {
      const wrapper = shallow(<Component id="mrGadget" />)
      expect(wrapper.html()).toMatchSnapshot()
    })

  })
})
