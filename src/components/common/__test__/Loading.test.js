import React from 'react'
import Component from '../Loading'
import {shallow} from 'enzyme'

describe('Loading behaviour', () => {
  describe('Markup', () => {
    it('Base markup', () => {
      const snapshotWrapper = shallow(<Component />)
      expect(snapshotWrapper.html()).toMatchSnapshot()
    })

    it('Inline markup', () => {
      const snapshotWrapper = shallow(<Component size="inline" />)
      expect(snapshotWrapper.html()).toMatchSnapshot()
    })

    it('Small markup', () => {
      const snapshotWrapper = shallow(<Component size="small" />)
      expect(snapshotWrapper.html()).toMatchSnapshot()
    })

    it('Small markup', () => {
      const snapshotWrapper = shallow(<Component size="big" />)
      expect(snapshotWrapper.html()).toMatchSnapshot()
    })
  })
})
