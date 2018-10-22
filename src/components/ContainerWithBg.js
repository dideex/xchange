import React from 'react'
import styled from 'react-emotion'

import {Icons, Colors} from './common'

const Section = styled('section')`
  & {
    margin: 670px 0 150px;
    position: relative;
    min-height: 569px;
    background-color: ${Colors.subAccent};
  }
`

const beforeContactBg = {
  zIndex: -1,
  position: 'absolute',
  width: '100%',
  bottom: 'calc(100% - 1px)',
  left: 0,
  right: 0,
}
const afterContactBg = {
  zIndex: -1,
  position: 'absolute',
  width: '100%',
  top: 'calc(100% - 1px)',
  left: 0,
  right: 0,
}

// Container stateless component;
const Container = props => (
  <Section>
    <Icons id="beforeContactBg" style={beforeContactBg} />
    {props.children}
    <Icons id="afterContactBg" style={afterContactBg} />
  </Section>
)

export default Container
