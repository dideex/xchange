import React, {Component} from 'react'
import styled from 'react-emotion'

import {H2, MainSectionWrap} from './common'

const P = styled('p')`
  font-size: 2.4rem;
  margin-bottom: 50px;
`

// AboutUs component; Contains information about company
class AboutUs extends Component {
  render() {
    return (
      <MainSectionWrap>
        <H2>О нас</H2>
        <P>Наш сервис помогает производить обмен Биткоин безопасно и быстро.</P>
        <P>
          Все операции по конвертации валют занимают не более 15 минут. Компетентная
          онлайн-поддержка с удовольствием проконсультирует Вас на всех этапах работы с
          нашим сервисом. Выгодные курсы и качественное обслуживание - залог работы с
          клиентами.
        </P>
        <P>
          Все операции по конвертации валют занимают не более 15 минут. Компетентная
          онлайн-поддержка с удовольствием проконсультирует Вас на всех этапах работы с
          нашим сервисом. Выгодные курсы и качественное обслуживание - залог работы с
          клиентами.
        </P>
      </MainSectionWrap>
    )
  }
}

export default AboutUs
