import React, {Component} from 'react'
import styled from 'react-emotion'

import {H2, container} from '../common'
import Operatoin from './Operation'

const Section = styled('section')`
  & {
    ${container} position: absolute;
    left: 0;
    right: 0;
    bottom: calc(100% + 250px);
  }
`

const Operations = styled('div')`
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
`

const mockData = [
  {
    mail: 'w***n@mail.ru',
    valueFrom: '3 000',
    valueTo: '3 000',
    status: 'ожидает оплаты',
    currency: 'Bitcoin',
  },
  {
    mail: 'd***x@yandex.ru',
    valueFrom: '2 000',
    valueTo: '3 550',
    status: 'переведено',
    currency: 'Bitcoin',
  },
  {
    mail: 's***n@gmail.com',
    valueFrom: '5 721',
    valueTo: '33 550',
    status: 'переведено',
    currency: 'Bitcoin',
  },
]

// LastOperations component;
class LastOperations extends Component {
  render() {
    return (
      <Section>
        <H2> Последние операции</H2>
        <Operations>
          {mockData.map(({mail, valueFrom, valueTo, status, currency}, i) => (
            <Operatoin
              key={i}
              mail={mail}
              valueFrom={valueFrom}
              valueTo={valueTo}
              status={status}
              currency={currency}
            />
          ))}
        </Operations>
      </Section>
    )
  }
}

export default LastOperations
