import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import styled from 'react-emotion'

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

// LastOperations component;
@inject('lastOperationsStore')
@observer
class LastOperations extends Component {

  render() {
    const {loading, data} = this.props.lastOperationsStore
    return (
      <Section>
        <H2> Последние операции</H2>
        {loading ? (
          <Loading size="big" />
        ) : (
          <OperationsWrap>
            <Operations offset={(data.length - 3) * -33.33}>
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
