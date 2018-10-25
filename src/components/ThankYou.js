import React from 'react'
import {Route} from 'react-router-dom'
import styled from 'react-emotion'

import {H2, Button, Icons} from './common'

const Wrap = styled('div')`
  & {
  }
  h2{
    text-decoration: underline;
  }
  & p,
  & svg,
  & button {
    width: 37%;
    display: block;
    margin: 50px auto;
  }
  & p {
    margin-bottom: 150px;
  }
`
const SubTitle = styled('p')`
  text-align: center;
`

// ThankYou stateless component;
export const ThankYou = () => (
  <Wrap>
    <H2>Мы фиксируем Ваш перевод!</H2>
    <SubTitle>
      Сразу после того как Выши средства поступят на наши реквизиты, операторы переведут
      на указаный вами кошелек нужную сумму
    </SubTitle>
    <Route
      render={({history}) => (
        <Button
          caption="В личный кабинетл"
          toggle={() => {
            history.push(`/cp`)
          }}
        />
      )}
    />
    <Icons id="mrGadget" />
  </Wrap>
)

export default ThankYou
