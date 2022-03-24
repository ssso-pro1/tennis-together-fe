import React from 'react'
import styled from 'styled-components'

const NotificationUl = ({ children }) => {
  return <Ul>{children}</Ul>
}

export default NotificationUl

const Ul = styled.ul`
  li {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    div {
      display: flex;
      align-items: center;
      .link {
        color: #11992f;
        padding-right: 5px;
        font-weight: bold;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`
