import React, {Component} from 'react'
import styled from 'react-emotion'

import {container, H2, Icons} from '../common'
import Chart from './Chart'

const Section = styled('section')`
  & {
    ${container};
    min-height: 514px;
    position: relative;
  }
  & .chart__svg {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 430px;
  }
`

// Graphic component;
class Graphic extends Component {
  render() {
    return (
      <Section>
        <H2> Курс Bitcoin за последний месяц</H2>
        <Chart />
        <Icons id="manByGraphic" className="chart__svg" />
      </Section>
    )
  }
}

export default Graphic
