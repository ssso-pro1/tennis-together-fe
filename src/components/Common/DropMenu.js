import React from 'react'
import styled from 'styled-components'

import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const DropMenu = (props) => {
  ;<Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        내가 쓴 글
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        히스토리
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        알림
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        친구목록
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        로그아웃
      </a>
    </Menu.Item>
    <Menu.Item danger>a danger item</Menu.Item>
  </Menu>

  return (
    <Dropdown overlay={DropMenu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Hover me <DownOutlined />
      </a>
    </Dropdown>
  )
}

export default DropMenu
