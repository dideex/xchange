import React, {Component} from 'react'
import styled from 'react-emotion'

const ChartWrap = styled('div')`
  background-color: #ffffff;
  border-radius: 10px;
  width: 75%;
`

// Chart component;
class Chart extends Component {
  static propTypes = {}

  render() {
    return <ChartWrap>Chart</ChartWrap>
  }
}

export default Chart
