import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import Svg from './StaffSvg'

const CommentWrap = styled('article')`
  & {
    margin: 0 50px;
    position: relative;
    border-radius: 10px;
    padding: 20px 25px;
    text-align: center;
    @media (max-width: 767px) {
      margin: 0 15px;
      padding: 20px 0;
    } 
    
  }
  & svg {
    position: relative;
    z-index: 0;
    margin-top: -30px;
    max-width: 50%;
  }
  & h3 {
    margin-top: 30px;
    font-size: 3.6rem;
    @media (max-width: 767px) {
      font-size: 2.5rem;
    } 
  }
  & p {
    font-size: 2.4rem;
  }
`

const Image = styled('img')`
  position: relative;
  z-index: 1;
  border-radius: 10px;
  margin: 0 auto;
  width: 30%;
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
