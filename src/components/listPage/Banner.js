import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Banner = () => {
  const history = useHistory()

  const goToWriting = () => {
    history.push('/pages/writing')
  }

  return (
    <Container>
      <Slider {...settings}>
        <div>
          <img src="/images/banner/banner11.png" alt="header-img" />
        </div>
        <div className="banner2">
          <a href="#searchA">
            <img src="/images/banner/banner2.png" alt="header-img" />
          </a>
        </div>
        <div className="banner3" onClick={() => goToWriting()}>
          <img src="/images/banner/banner3.png" alt="header-img" />
        </div>
      </Slider>
    </Container>
  )
}

export default Banner

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const Container = styled.div`
  scroll-behavior: smooth;

  box-sizing: border-box;
  width: 1200px;
  height: 25em;
  margin: 20px auto;

  div {
    margin: 0px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    img {
      margin: 0px auto;
      width: 100%;
      height: 100%;
    }
    .banner2,
    .banner3 {
      cursor: pointer;
    }
    .banner2 {
      scroll-behavior: smooth;
    }
  }
`
