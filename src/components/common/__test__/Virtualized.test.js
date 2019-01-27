import React from 'react'
import {Virtualized} from '../Virtualized'
import {mount, shallow} from 'enzyme'
import {StaticRouter} from 'react-router-dom'
import {IntlProvider, intlShape, injectIntl} from 'react-intl'

import messages from '../../../locale/en.json'
const intlProvider = new IntlProvider({locale: 'en', messages}, {})
const {intl} = intlProvider.getChildContext()

function nodeWithIntlProp(node) {
  return React.cloneElement(node, {intl})
}

export function shallowWithIntl(node, {context, ...additionalOptions} = {}) {
  return shallow(nodeWithIntlProp(node), {
    context: Object.assign({}, context, {intl}),
    ...additionalOptions,
  })
}

export function mountWithIntl(
  node,
  {context, childContextTypes, ...additionalOptions} = {},
) {
  return mount(nodeWithIntlProp(node), {
    context: Object.assign({}, context, {intl}),
    childContextTypes: Object.assign({}, {intl: intlShape}, childContextTypes),
    ...additionalOptions,
  })
}

describe('Virtualized tests', () => {
  it('Base markup', () => {
    const wrapper = mountWithIntl(
      <StaticRouter location="/" context={{}}>
        <Virtualized intl={{}} parsedOrders={[]} endpoint="endpoint" />
      </StaticRouter>,
    )

    console.log(wrapper.debug())
    expect(1+1).toBe(2)
  })
})
