import React from 'react'
import { useHistory } from 'react-router'

// import NavDMenu from './NavDMenu'
// import DropMenu from './DropMenu'

import styled, { css } from 'styled-components'
import AvatarBase from '../../styled-components/Avatar'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const NavbarDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1.5rem;
  border-bottom: 1px solid lightgrey;

  h2,
  h3 {
    font-weight: bold;
    cursor: pointer;
  }

  h3 {
    color: gray;
  }
`

const LoginDiv = styled.div``

const Navbar = ({ authService }) => {
  const history = useHistory()

  // const uid = '01012341234'
  const uid = false

  const goToListPage = () => {
    history.push('/')
  }

  const goToLogin = () => {
    history.push('/login')
  }
  const dropMenu = () => {}

  return (
    // 로그인한 경우 : 종? 프로필사진, 글쓰기 버튼
    // 안한 경우 : 로그인 회원강비 글쓰기 버튼
    <>
      <NavbarDiv>
        <h2 onClick={() => goToListPage()}>테니스투게더</h2>
        <LoginDiv>
          {uid === false ? (
            <h3 onClick={() => goToLogin()}>로그인</h3>
          ) : (
            <AvatarBase>
              <span
                onClick={() => dropMenu()}
                className="avatarImg"
                size={'12px'}
              ></span>
            </AvatarBase>
          )}
        </LoginDiv>
        {/* <NavDMenu /> */}
        {/* <DropMenu /> */}
      </NavbarDiv>
    </>
  )
}

export default Navbar
