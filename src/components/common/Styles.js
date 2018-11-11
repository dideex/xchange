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
  @media (max-width: 768px) {
    max-width: 360px;
  } 
  @media (max-width: 1024px) {
    max-width: 768px;
  } 
`

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
  } 
`

export const StatusIconColors = [
  'transparent',
  '#FFE712',
  '#ff9800',
  '#8FBE00',
  '#FC0000',
]

export const StatusTitles = [
  'Не создан',
  'Ожидает перевода',
  'Ожидает подтверждения',
  'Переведено',
  'Отменено',
]

export const MainSectionWrap = styled('div')`
  & {
    padding: 0 60px;
    @media (max-width: 1024px) {
      padding: 0 30px;
    } 
  }
`

export default Styles
