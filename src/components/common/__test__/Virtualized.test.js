import React from 'react'
import {Virtualized} from '../Virtualized'
import {mount, shallow} from 'enzyme'
import {StaticRouter} from 'react-router-dom'
import {mountWithIntl} from '../../../helpers/intl'

describe('Virtualized tests', () => {
  const intl = {formatMessage: ({id}) => id}
  it('Base markup', () => {
    const wrapper = mountWithIntl(
      <StaticRouter location="/" context={{}}>
        <Virtualized intl={intl} parsedOrders={[]} endpoint="endpoint" />
      </StaticRouter>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('Orders behaviour', () => {
    it('Orderds markup', () => {
      const orders = [
        {
          id: 'id',
          created: 'created',
          inputValue: 'inputValue',
          outputValue: 'outputValue',
          toWallet: 'toWallet',
          paymentStatus: 'paymentStatus',
        },
      ]
      const wrapper = mountWithIntl(
        <StaticRouter location="/" context={{}}>
          <Virtualized intl={intl} parsedOrders={orders} endpoint="endpoint" />
        </StaticRouter>,
      )
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Orderds markup', () => {
      const orders = [
        {
          id: 'id',
          created: 'created',
          inputValue: 'inputValue',
          outputValue: 'outputValue',
          toWallet: 'toWallet',
          paymentStatus: 'paymentStatus',
        },
        {
          id: 'id2',
          created: 'created2',
          inputValue: 'inputValue2',
          outputValue: 'outputValue2',
          toWallet: 'toWallet2',
          paymentStatus: 'paymentStatus2',
        },
        {
          id: 'id3',
          created: 'created3',
          inputValue: 'inputValue3',
          outputValue: 'outputValue3',
          toWallet: 'toWallet3',
          paymentStatus: 'paymentStatus3',
        },
      ]
      const wrapper = mountWithIntl(
        <StaticRouter location="/" context={{}}>
          <Virtualized intl={intl} parsedOrders={orders} endpoint="endpoint" />
        </StaticRouter>,
      )
      expect(wrapper.html()).toMatchSnapshot()
      console.log(wrapper.html())
    })
  })
})
