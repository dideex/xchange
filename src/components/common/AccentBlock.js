import React from 'react'
import styled from 'react-emotion'

const StyledInput = styled('div')`
  & {
    width: 100%;
    position: relative;
    z-index: 0;
    border: rgba(255, 255, 255, 0.4) 5px solid;
    border-radius: 5px;
    padding: 8px 15px;
    background: #fff;
    background-clip: padding-box;
    transition: border-color 0.3s ease-in-out;
  }
  &:hover {
    border-color: rgba(255, 255, 255, 0.7);
  }
  &:focus,
  &:active {
    outline: none;
    border-color: #fff;
  }
`
const InputWrap = styled('div')`
  position: relative;
  display: block;
  width: 100%;
`

// Block with accent wrapper
export const AccentBlock = ({value}) => (
  <StyledInput>
    <InputWrap>
      {value}
    </InputWrap>
  </StyledInput>
)

export default AccentBlock
