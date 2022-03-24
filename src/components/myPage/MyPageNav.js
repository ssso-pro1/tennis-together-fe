import React from 'react'
import styled from 'styled-components'

const MyPageNav = ({ children }) => {
  return <NavUl>{children}</NavUl>
}

export default MyPageNav

const NavUl = styled.ul`
  border-bottom: 1px solid lightgrey;
  margin-bottom: 50px;
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
