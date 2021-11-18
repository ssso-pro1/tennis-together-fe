import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../../service/authState'

import styled, { css } from 'styled-components'
import Button from '../../styled-components/Buttons'
import AvatarBase from '../../styled-components/Avatar'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { handleSignOut } from '../../service/authService'
import AuthService from '../../service/authService'
import AuthState from '../../service/authState'
// import NavDMenu from './NavDMenu'
// import DropMenu from './DropMenu'

const NavbarDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1.5rem;
  border-bottom: 1px solid lightgrey;

  .logo {
    display: flex;
    flex-direction: row;
    line-height: 30px;
    .logo-title {
      margin-left: 0.5rem;
      font-size: 1.4rem;
      /* @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Petemoss&display=swap');
      font-family: 'Lobster', cursive; */
    }
  }

  h2,
  h3 {
    font-weight: bold;
    cursor: pointer;
  }
  h3 {
    color: gray;
  }
`
const LoginDiv = styled.div`
  line-height: 30px;
`
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
    authState.handleSignOut() // authState되는지 확인
  }

  const dropMenu = () => {}
  const DropMenu = () => {
    ;<Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://localhost:3001/writing"
        >
          내가 쓴 글
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://localhost:3001/writing"
        >
          히스토리
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://localhost:3001/writing"
        >
          알림
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://localhost:3001/writing"
        >
          친구목록
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://localhost:3001/writing"
        >
          로그아웃
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
  }

  // 로그인한 경우 : 종? 프로필사진, 글쓰기 버튼
  // 안한 경우 : 로그인 회원강비 글쓰기 버튼

  // 로그인 버튼 클릭 시 navbar의 로그인 버튼이 회원가입버튼으로 변경???
  // {/* db 계정 확인 후 로그인한 user?아바타(프로필사진), 종? + 글쓰기 : 로그인 */}
  return (
    <NavbarDiv>
      <div className="logo">
        <img src="/images/img-tennis-ball.png" alt="logo-ball" width="30px" />
        <h2 onClick={() => goToListPage()} className="logo-title">
          Tennis Together
        </h2>
      </div>
      <LoginDiv>
        {user ? (
          <SignedInDiv>
            {/* <AvatarBase>
              <span
                onClick={() => dropMenu()}
                className="avatarImg"
                size={'12px'}
              ></span>
            </AvatarBase> */}
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
  )
}

export default Navbar
