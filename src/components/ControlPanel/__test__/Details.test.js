import React from 'react'
import Component from '../Details'
import {shallow} from 'enzyme'
import {fakeData} from '../../../helpers/fixtures'
import {mountWithIntl} from '../../../helpers/intl'

describe('Control panel: details tests', () => {
  describe('Component markup', () => {
    it('Basic marup', () => {
      const wrapper = mountWithIntl(<Component {...fakeData} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Basic marup eng', () => {
      const wrapper = shallow(<Component {...fakeData} />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
