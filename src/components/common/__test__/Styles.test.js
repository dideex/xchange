import {
  coinColors,
  SvgCurrency,
  container,
  robotoSlab,
  H2,
  StatusIconColors,
  StatusTitles,
  MainSectionWrap,
} from '../Styles'

describe('Style snapshots', () => {
  it('coinColors', () => {
    expect(coinColors).toMatchSnapshot()
  })
  it('SvgCurrency', () => {
    expect(SvgCurrency).toMatchSnapshot()
  })
  it('container', () => {
    expect(container).toMatchSnapshot()
  })
  it('robotoSlab', () => {
    expect(robotoSlab).toMatchSnapshot()
  })
  it('H2', () => {
    expect(H2).toMatchSnapshot()
  })
  it('StatusIconColors', () => {
    expect(StatusIconColors).toMatchSnapshot()
  })
  it('StatusTitles', () => {
    expect(StatusTitles).toMatchSnapshot()
  })
  it('MainSectionWrap', () => {
    expect(MainSectionWrap).toMatchSnapshot()
  })
})
