import styled from 'react-emotion'

export const Styles = {}

// Coin svg icon styles
export const SvgCurrency = {
  width: '32px',
  height: '32px',
}

// Coin icon colors
export const coinColors = {
  label: {
    fill: '#edda48',
  },
  body: {
    fill: '#e2b255',
  },
}

// Styles for container block
export const container = `
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 768px) {
    max-width: 360px;
  } 
  @media (max-width: 1024px) {
    max-width: 768px;
  } 
`

// Base font settings
export const robotoSlab = `'Roboto Slab', 'PT Serif', 'Monospaced Number', 'Chinese Quote', -apple-system,
BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB',
'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif`

export const H2 = styled('h2')`
  text-align: center;
  font-family: ${robotoSlab};
  font-size: 4.8rem;
  margin: 20px 0 40px;
  @media (max-width: 767px) {
    font-size: 2.8rem;
    margin-top: 0;
  }
`

// Color for payment status icons table data
export const StatusIconColors = [
  'transparent',
  '#FFE712',
  '#ff9800',
  '#8FBE00',
  '#FC0000',
]

// Title for payment status icons table data
export const StatusTitles = [
  'Не создан',
  'Ожидает перевода',
  'Ожидает подтверждения',
  'Переведено',
  'Отменено',
]

// Styles for main section wrapper
export const MainSectionWrap = styled('div')`
  & {
    padding: 0 60px;
    @media (max-width: 1024px) {
      padding: 0 30px;
    }
    @media (max-width: 767px) {
      padding: 0 15px;
    }
  }
`

export default Styles
