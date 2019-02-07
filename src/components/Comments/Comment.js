import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {Colors, robotoSlab} from '../common'

const CommentWrap = styled('article')`
  & {
    margin: 0 10px;
    position: relative;
    border-radius: 10px;
    background-color: ${Colors.accent};
    padding: 20px 25px;
  }
`

const BacksideBlock = styled('div')`
  & {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: -1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 25px 25px 10px;
    background-color: #fff;
    border-radius: 10px;
    transform: translateY(160px);
    @media (max-width: 767px) {
      font-size: 1rem;
    }
  }
`

const Image = styled('img')`
  border-radius: 10px;
  @media (max-width: 767px) {
    width: 80px;
  }
`

const ContentWrap = styled('div')`
  & {
    display: flex;
    align-items: center;
  }
  & h3 {
    font-family: ${robotoSlab};
    font-size: 2.8rem;
    @media (max-width: 767px) {
      font-size: 1.8rem;
    }
  }
  & hgroup {
    padding-left: 30px;
  }
`

// Feedback section, comment component
const Comment = ({photo, name, role, message}) => (
  <CommentWrap>
    <ContentWrap>
      <Image src={photo} alt="Avatr" />
      <hgroup>
        <h3>{name}</h3>
        <p>{role}</p>
      </hgroup>
    </ContentWrap>
    <BacksideBlock>
      <p>
        <span>{message}</span>
      </p>
    </BacksideBlock>
  </CommentWrap>
)

Comment.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}
export default Comment
