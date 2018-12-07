import React from 'react'
import styled from 'react-emotion'
import {FormattedMessage} from 'react-intl'

import {container, H2, Icons} from '../common'
import Chart from './Chart'

const Section = styled('section')`
  & {
    ${container};
    min-height: 514px;
    position: relative;
    @media (max-width: 1024px) {
      min-height: 250px;
    }
  }
  & .chart__svg {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 430px;
    @media (max-width: 767px) {
      display: none;
    }
  }
`

// Component contains bitcoing graphic;
export default () => (
  <Section>
    <H2>
      <FormattedMessage
        id="home.chart.header"
        defaultMessage="Курс Bitcoin за последний месяц"
      />
    </H2>
    <Chart />
    <Icons id="manByGraphic" className="chart__svg" />
  </Section>
)
