import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
// import Slider from '@ant-design/react-slick'
// import '~slick-carousel/slick/slick.css'
// import '~slick-carousel/slick/slick-theme.css'

const Header = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  //   header 사진 사이즈 고정? 디자인 구체적으로 다시 정하기
  const Container = styled.div`
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
      .banner {
        cursor: pointer;
      }
    }
  `

  return (
    <Container>
      <Slider {...settings}>
        <div>
          <img src="/images/banner/banner11.png" alt="header-img" />
        </div>
        <div className="banner">
          <img src="/images/banner/banner2.png" alt="header-img" />
        </div>
        <div>
          <img src="/images/banner/header3.jpg" alt="header-img" />
        </div>
      </Slider>
    </Container>
  )
}

export default Header
