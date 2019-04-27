import React from 'react'
import {observer, inject} from 'mobx-react'
import {Route} from 'react-router-dom'
import {FormattedMessage, injectIntl} from 'react-intl'
import styled from 'react-emotion'

import {H2, Button, Icons} from './common'

const Wrap = styled('div')`
  h2 {
    text-decoration: underline;
  }
  & p,
  & svg,
  & button {
    width: 37%;
    display: block;
    margin: 50px auto;
  }
  @media (max-width: 1024px) {
    & button,
    & p {
      width: 100%;
    }
  }
  & p {
    margin-bottom: 150px;
    @media (max-width: 1024px) {
      margin-bottom: 50px;
    }
  }
`
const SubTitle = styled('p')`
  text-align: center;
`

// ThankYou stateless component;
export const ThankYou = ({userStore, cashStore, intl}) => {
  const {formatMessage} = intl
  // different endpoins for user and guest
  const url = userStore.token ? '/lichnii-kabinet' : `/perevod/${cashStore.orderId}`
  const caption = formatMessage({
    id: userStore.token ? 'ty.register.caption' : 'ty.guest.caption',
    defaultMessage: 'Следить за переводом',
  })
  return (
    <Wrap>
      <H2>
        <FormattedMessage id="ty.header" defaultMessage="Мы фиксируем Ваш перевод!" />
      </H2>
      <SubTitle>
        <FormattedMessage
          id="ty.subTitle"
          defaultMessage="Сразу после того как Выши средства поступят на наши реквизиты, операторы переведут на указаный вами кошелек нужную сумму"
        />
      </SubTitle>
      <Route
        render={({history}) => (
          <Button
            caption={caption}
            toggle={() => {
              history.push(url)
            }}
          />
        )}
      />
      <Icons id="mrGadget" />
    </Wrap>
  )
}

export default inject('cashStore')(inject('userStore')(observer(injectIntl(ThankYou))))
