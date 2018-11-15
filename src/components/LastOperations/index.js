import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import styled from 'react-emotion'
import {FormattedMessage, injectIntl} from 'react-intl'
import {isMobile, isTablet} from 'react-device-detect'

import {H2, container, Loading} from '../common'
import Operatoin from './Operation'

const Section = styled('section')`
  & {
    ${container} position: absolute;
    left: 0;
    right: 0;
    bottom: calc(100% + 250px);
  }
`

const OperationsWrap = styled('div')`
  overflow: hidden;
`

const Operations = styled('div')`
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
  transform: translate3d(${({offset}) => offset}%, 0, 0);
  transition: transform 0.3s ease-in-out;
`

const AdaptiveSettings = [
  {
    amount: 3,
    width: -33.33,
  },
  {
    amount: 2,
    width: -50,
  },
  {
    amount: 1,
    width: -100,
  },
]

// LastOperations component;
@inject('lastOperationsStore')
@injectIntl
@observer
class LastOperations extends Component {
  render() {
    const {loading, data} = this.props.lastOperationsStore
    const deviceType = isTablet ? 1 : isMobile ? 2 : 0
    return (
      <Section>
        <H2>
          <FormattedMessage
            id="home.lastOperations.header"
            defaultMessage="Последние операции"
          />
        </H2>
        {loading ? (
          <Loading size="big" />
        ) : (
          <OperationsWrap>
            <Operations
              offset={
                (data.length - AdaptiveSettings[deviceType].amount) *
                AdaptiveSettings[deviceType].width
              }
            >
              {data.map((props, i) => (
                <Operatoin key={i} {...props} />
              ))}
            </Operations>
          </OperationsWrap>
        )}
      </Section>
    )
  }
}

export default LastOperations
