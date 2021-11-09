import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../../service/authState'
// import NavDMenu from './NavDMenu'
// import DropMenu from './DropMenu'

import styled, { css } from 'styled-components'
import Button from '../../styled-components/Buttons'
import AvatarBase from '../../styled-components/Avatar'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { handleSignOut } from '../../service/authService'
import AuthService from '../../service/authService'

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

const SignedInDiv = styled.div`
  display: flex;
  flex-direction: row;
`
// const Button = styled.button``

const SignOut = styled.div``

const Navbar = ({ authService, authState }) => {
  // UserContext 는 백엔드 api 연동 후!
  const { user } = useContext(UserContext)
  // const user = false

  const history = useHistory()

  const goToListPage = () => {
    history.push('/')
  }

  const goToSignIn = () => {
    history.push('/authin')
  }

  const goToWriting = () => {
    history.push('/writing')
  }

  const goSignOut = () => {
    // e.preventDefault()
    console.log('로그아웃')
    authService.handleSignOut()
  }

  const dropMenu = () => {}

  return (
    // 로그인한 경우 : 종? 프로필사진, 글쓰기 버튼
    // 안한 경우 : 로그인 회원강비 글쓰기 버튼

    // 로그인 버튼 클릭 시 navbar의 로그인 버튼이 회원가입버튼으로 변경???
    <>
      <NavbarDiv>
        <h2 onClick={() => goToListPage()}>테니스투게더</h2>
        <LoginDiv>
          {/* api fetch 해와서 로그인한 user?아바타(프로필사진), 종? + 글쓰기 : 로그인 */}
          {user ? (
            <SignedInDiv>
              <AvatarBase>
                <span
                  onClick={() => dropMenu()}
                  className="avatarImg"
                  size={'12px'}
                ></span>
              </AvatarBase>
              <Button width={'50px'} onClick={() => goToWriting()}>
                글쓰기
              </Button>
              <SignOut>
                <Button Secondary width={'50px'} onClick={goSignOut}>
                  로그아웃
                </Button>
              </SignOut>
            </SignedInDiv>
          ) : (
            <h3 onClick={() => goToSignIn()}>로그인</h3>
          )}
        </LoginDiv>
        {/* <NavDMenu /> */}
        {/* <DropMenu /> */}
      </NavbarDiv>
    </>
  )
}

export default Navbar
