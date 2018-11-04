import React, {Component} from 'react'
import openSocket from 'socket.io-client'
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

const socket = openSocket('http://localhost:3040')

// LastOperations component;
class LastOperations extends Component {
  state = {
    data: [],
    loading: true,
  }

  componentDidMount() {
    socket.on('message', this._socketResolver)
  }

  componentWillUnmount() {
    socket.removeListener('message', this._socketResolver)
  }

  _socketResolver = ({type, data, order}) => {
    switch (type) {
      case 'broadcast':
        return this.setState({data: [...this.state.data, order]})
      case 'init':
        return this.setState({loading: false, data})

      default:
        return console.log('unknown message')
    }
  }

  render() {
    return (
      <Section>
        <H2> Последние операции</H2>
        {this.state.loading ? (
          <Loading size="big" />
        ) : (
          <OperationsWrap>
            <Operations offset={(this.state.data.length - 3) * -33.33}>
              {this.state.data.map((props, i) => (
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
