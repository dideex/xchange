import React, {Component} from 'react'
import styled from 'react-emotion'
import {ResponsiveContainer, ComposedChart, XAxis, YAxis, Area, Tooltip} from 'recharts'

import {Colors, Loading} from '../common'

const ChartWrap = styled('div')`
  background-color: #ffffff;
  border-radius: 10px;
  width: 75%;
  padding: 30px;
`

const monthArray = [
  'Янв',
  'Февр',
  'Март',
  'Апр',
  'Мая',
  'Июнь',
  'Июль',
  'Авг',
  'Сент',
  'Окт',
  'Нояб',
  'Дек',
]

const api =
  'https://api.blockchain.info/charts/market-price?cors=true&timespan=30days&format=json&lang=ru'

// Chart component;
class Chart extends Component {
  state = {
    loading: true,
  }
  componentDidMount() {
    fetch(api)
      .then(res => res.json())
      .then(({values, ...res}) => {
        this.setState({
          values: values.map(({x: timestamp, y}) => {
            const parsedDate = new Date(timestamp * 1000)
            const date = `${monthArray[parsedDate.getMonth()]}, ${parsedDate.getDate()}`
            return {date, USD: Math.round(y)}
          }),
          ...res,
          loading: false,
        })
      })
      .catch(err => console.error(err))
  }

  _renderChart = () => {
    return (
      <ResponsiveContainer width={'100%'} height={450}>
        <ComposedChart data={this.state.values}>
          <XAxis dataKey="date" />
          <YAxis
            dataKey="USD"
            type="number"
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip />
          <Area
            type="stepBefore"
            dataKey="USD"
            stroke={Colors.darkAccent}
            fill={Colors.accent}
          />
        </ComposedChart>
      </ResponsiveContainer>
    )
  }

  render() {
    return <ChartWrap>{this.state.loading ? <Loading size="big" /> : this._renderChart()}</ChartWrap>
  }
}

export default Chart
