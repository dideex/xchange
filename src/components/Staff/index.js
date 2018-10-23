import React, {Component} from 'react'
import styled from 'react-emotion'
import Slider from 'react-slick'

import {container, Icons, Colors, H2} from '../common'
import Card from './Card'

const Section = styled('section')`
  & {
    ${container};
    padding-top: 50px;
  }
  & .comments {
    display: flex;
    justify-content: space-between;
    padding: 0 60px;
    position: relative;
    overflow: hidden;
  }
  & .chevron__left {
    cursor: pointer;
    width: 50px;
    height: 60px;
    margin: auto 0;
    position: absolute;
    right: 100%;
    top: 0;
    bottom: 0;
    transform: rotate(90deg);
  }
  & .chevron__right {
    cursor: pointer;
    width: 50px;
    height: 60px;
    margin: auto 0;
    position: absolute;
    left: 100%;
    top: 0;
    bottom: 0;
    transform: rotate(-90deg);
  }
  & .slick-slide {
    min-height: 450px;
  }
`

const SliderContainer = styled('div')`
  position: relative;
  padding: 0 50px;
`

const mockComments = [
  {
    photo: './img/staff1.png',
    name: 'Абакумов М.А.',
    role: 'Генеральный директор',
    svg: 'staff1',
  },
  {
    photo: './img/staff2.png',
    name: 'Петухов В.М.',
    role: 'Старший менеджер',
    svg: 'staff2',
  },
  {
    photo: './img/staff3.png',
    name: 'Петухов В.М.',
    role: 'Старший менеджер',
    svg: 'staff1',
  },
  {
    photo: './img/staff4.png',
    name: 'Петухов В.М.',
    role: 'Старший менеджер',
    svg: 'staff2',
  },
]

function SampleNextArrow(props) {
  const {style, onClick} = props
  return (
    <Icons
      id="chevron"
      className="chevron__left"
      style={{...style, fill: Colors.black}}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const {style, onClick} = props
  return (
    <Icons
      id="chevron"
      className="chevron__right"
      style={{...style, fill: Colors.black}}
      onClick={onClick}
    />
  )
}

// Comments component;
class Comments extends Component {
  static propTypes = {}

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      lazyLoad: false,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }
    return (
      <Section>
        <H2>Наша команда</H2>
        <SliderContainer>
          <Slider {...settings}>
            {mockComments.map((props, i) => (
              <Card key={i} {...props} />
            ))}
          </Slider>
        </SliderContainer>
      </Section>
    )
  }
}

export default Comments
