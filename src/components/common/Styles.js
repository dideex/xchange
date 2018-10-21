import styled from 'react-emotion'

export const Styles = {}

export const SvgCurrency = {
  width: '32px',
  height: '32px',
}

export const coinColors = {
  label: {
    fill: '#edda48',
  },
  body: {
    fill: '#e2b255',
  },
}

export const container = `
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;
`

export const robotoSlab = `'Roboto Slab', 'PT Serif', 'Monospaced Number', 'Chinese Quote', -apple-system,
BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB',
'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif`

export const H2 = styled('h2')`
  text-align: center;
  font-family: ${robotoSlab};
  font-size: 48px;
  margin: 20px 0 40px;
`

export default Styles
