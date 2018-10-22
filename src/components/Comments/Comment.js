import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {Colors} from '../common'

const CommentWrap = styled('article')`
  & {
    margin: 0 10px;
    position: relative;
    border-radius: 10px;
    background-color: ${Colors.accent};
    padding: 20px 15px;
  }
`

const BacksideBlock = styled('div')`
  & {
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 15px 3px;
    background-color: #fff;
    border-radius: 10px;
    transform: translateY(35px);
  }
  & p {
    position: absolute;
    bottom: 3px;
    left: 25px;
    right: 25px;
    display: flex;
    justify-content: space-between;
  }
  & span {
    color: #fff;
  }
`

// Comment stateless component;
const Comment = ({photo, name, role, message}) => (
  <CommentWrap>
    <img src={photo} alt="Avatr" /> {message}{' '}
  </CommentWrap>
)

Comment.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}
export default Comment
