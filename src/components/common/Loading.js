import React from 'react'
import { Spin, Space } from 'antd'

const Loading = () => {
  return (
    <Space className="spin">
      <Spin className="spin" />
    </Space>
  )
}

export default Loading
