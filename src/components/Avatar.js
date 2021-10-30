import React from 'react'
import { Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const AvaContent = styled.div`
  display: flex;
  align-items: center;
`

function Avatars() {
  return (
    <AvaContent>
      <div className="avatar_default">
        <a href="">
          <Avatar icon={<UserOutlined />} />
        </a>
      </div>
      <div className="avatar_set">
        <a href="">
          <Avatar
            src={
              <Image
                src="https://joeschmoe.io/api/v1/random"
                style={{ width: 32 }}
              />
            }
          />
        </a>
      </div>
      <div className="info">
        <a href="/" className="username">
          <strong style={{ color: 'black' }}>연두방구</strong>
        </a>
      </div>
    </AvaContent>
  )
}

export default Avatars
