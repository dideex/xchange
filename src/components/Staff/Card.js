import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {} from '../common'
import Svg from './StaffSvg'

const CommentWrap = styled('article')`
  & {
    margin: 0 50px;
    position: relative;
    border-radius: 10px;
    padding: 20px 25px;
    text-align: center;
  }
  & svg {
    position: relative;
    z-index: 0;
    margin-top: -30px;
  }
  & h3 {
    margin-top: 30px;
    font-size: 36px;
  }
  & p {
    font-size: 24px;
  }
`

const Image = styled('img')`
  position: relative;
  z-index: 1;
  border-radius: 10px;
  margin: 0 auto;
  width: 140px;
`

// Comment stateless component;
const Card = ({photo, name, role, svg}) => (
  <CommentWrap>
    <Image src={photo} alt="Avatr" />
    <Svg id={svg} />
    <h3>{name}</h3>
    <p>{role}</p>
  </CommentWrap>
)

Card.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  svg: PropTypes.string.isRequired,
}
export default Card
