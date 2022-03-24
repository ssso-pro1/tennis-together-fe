import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'

const MyPageNav = ({ children }) => {
  return (
    <NavWrapper>
      <Row>
        <Col span={4} offset={5}>
          <NavUl>{children}</NavUl>
        </Col>
      </Row>
    </NavWrapper>
  )
}

export default MyPageNav

const NavWrapper = styled.div`
  border-bottom: 1px solid lightgrey;
  margin-bottom: 50px;
`

const NavUl = styled.ul`
  display: flex;
  align-items: flex-end;

  li {
    padding: 25px;
    :first-child {
      font-weight: 700;
      font-size: 20px;
    }
    :not(:first-child) {
      cursor: pointer;
      font-weight: 700;
      font-size: 15px;
      color: gray;
      transition: color 150ms ease-in-out;
      margin-right: 15px;
      padding-left: 0;
      padding-right: 0;

      &:hover {
        color: black;
      }
    }
  }
`
