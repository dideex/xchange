import React from 'react'
import styled from 'react-emotion'
import {FormattedMessage} from 'react-intl'

import {H2, MainSectionWrap} from './common'

const P = styled('p')`
  font-size: 2.4rem;
  margin-bottom: 50px;
`

// FIXME: Add i18n to this compoent
// AboutUs component; Contains information about the company
export default () => (
  <MainSectionWrap>
    <H2>
      <FormattedMessage id="home.nav.about" defaultMessage="О нас" />
    </H2>
    <P>
      <FormattedMessage
        id="home.about.subTitle"
        defaultMessage="Наш сервис помогает производить обмен Биткоин безопасно и быстро."
      />
    </P>
    <P>
      <FormattedMessage
        id="home.about.content"
        defaultMessage="Все операции по конвертации валют занимают не более 15 минут. Компетентная онлайн-поддержка с удовольствием проконсультирует Вас на всех этапах работы с нашим сервисом. Выгодные курсы и качественное обслуживание - залог работы с клиентами."
      />
    </P>
  </MainSectionWrap>
)
