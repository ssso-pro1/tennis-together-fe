import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../../service/authState'
import firebase from 'firebase'

import styled, { css } from 'styled-components'
import { ReactComponent as Bell36 } from '../../styled-components/assets/images/Bell36.svg'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import AvatarBase from '../../styled-components/Avatar'
import Button from '../../styled-components/Buttons'
import { DownOutlined } from '@ant-design/icons'
import { Menu, Dropdown } from 'antd'

const NavbarDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1.5rem;
  border-bottom: 1px solid lightgrey;
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo-title {
      margin-left: 0.5rem;
      font-size: 1.5rem;
      font-family: 'Permanent Marker', cursive;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 30px;
`
const SignedInDiv = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .bell {
    margin-right: 0.8rem;
  }
  img {
    margin-right: 0.5rem;
  }
  .dropdown {
    display: flex;
    align-items: center;
    margin-right: 1.5rem;
    .droparrow {
      color: #b2b3b9;
    }
  }
`
// const Button = styled.button``
const SignOut = styled.div``

const Navbar = ({ props }) => {
  const { user, setUser } = useContext(UserContext)

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

  const goToHistory = () => {
    history.push('/history')
  }

  const goToNotif = () => {
    history.push('/notifications')
  }

  const goToUpdatePro = () => {
    history.push('/')
  }

  const goSignOut = () => {
    localStorage.removeItem('token')
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
    setUser(null)
    alert('로그아웃되었습니다.')
    console.log('로그아웃')
    history.push('/')
  }

  const dropMenu = () => (
    <Menu>
      <Menu.Item key="0" onClick={() => goToHistory()}>
        히스토리
      </Menu.Item>
      <Menu.Item key="1" onClick={() => goToNotif()}>
        알림
      </Menu.Item>
      <Menu.Item key="2" onClick={() => goToUpdatePro()}>
        개인정보수정
      </Menu.Item>
      <Menu.Item key="3" onClick={() => goSignOut()}>
        로그아웃
      </Menu.Item>
    </Menu>
  )

  // 로그인 버튼 클릭 시 navbar의 로그인 버튼이 회원가입버튼으로 변경???
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
            <Bell36 className="bell" width="1.5rem" />
            <Dropdown
              className="dropdown"
              overlay={dropMenu}
              trigger={['click']}
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  className="avatarImg"
                  width="33px"
                  src={DefaultImg}
                  alt={DefaultImg}
                />
                <DownOutlined className="droparrow" />
              </a>
            </Dropdown>
            <Button width={'4.5rem'} onClick={() => goToWriting()}>
              글쓰기
            </Button>
          </SignedInDiv>
        ) : (
          <h3 onClick={() => goToSignIn()}>로그인</h3>
        )}
      </LoginDiv>
    </NavbarDiv>
  )
}

export default Navbar
