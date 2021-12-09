import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  const Section = styled.div`
    padding: 2rem;
    border-top: 1px solid lightgrey;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-top: 10%;
    /* position: absolute;
    bottom: 0; */
    .rights {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    .info {
      font-size: 0.8rem;
    }
  `
  return (
    <Section>
      <div>
        <p className="rights">2021 Tennis Together - All Rights Reserved</p>
      </div>
      <p className="info">
        본 사이트는 상업적 목적이 아닌 포트폴리오 용도로 제작되었으며, 일부
        이미지는 그 출처가 따로 있음을 밝힙니다.
      </p>
    </Section>
  )
}

export default Footer
