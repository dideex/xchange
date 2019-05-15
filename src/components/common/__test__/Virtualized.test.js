import React from 'react'
import {Virtualized} from '../Virtualized'
import {StaticRouter} from 'react-router-dom'
import {mountWithIntl} from '../../../helpers/intl'
import {mountWrap} from '../../../helpers/router-intl-context'

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
    const orders = [
      {
        id: 'id',
        created: 'created',
        inputValue: 'inputValue',
        outputValue: 'outputValue',
        toWallet: 'toWallet',
        paymentStatus: 1,
      },
      {
        id: 'id2',
        created: 'created2',
        inputValue: 'inputValue2',
        outputValue: 'outputValue2',
        toWallet: 'toWallet2',
        paymentStatus: 1,
      },
      {
        id: 'id3',
        created: 'created3',
        inputValue: 'inputValue3',
        outputValue: 'outputValue3',
        toWallet: 'toWallet3',
        paymentStatus: 1,
      },
    ]
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
      const wrapper = mountWithIntl(
        <StaticRouter location="/" context={{}}>
          <Virtualized intl={intl} parsedOrders={orders} endpoint="endpoint" />
        </StaticRouter>,
      )

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('Orderds markup with router', () => {
      const wrapper = mountWrap(
        <Virtualized parsedOrders={orders} endpoint="fake endpoint" />,
      )

      // expect(wrapper.html()).toMatchSnapshot()
      console.log(wrapper.html())
      // expect(wrapper.debug()).toMatchSnapshot()
    })
  })
})
