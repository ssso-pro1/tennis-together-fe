import React from 'react'
import { Table } from 'antd'
const dataSource = [
  {
    key: '1',
    title: '모집날짜',
    info: 32,
  },
  {
    key: '2',
    title: '장소',
    info: 42,
  },
  {
    key: '3',
    title: '주소',
    info: 42,
  },
  {
    key: '4',
    title: '위치정보',
    info: 42,
  },
  {
    key: '5',
    title: '전화번호',
    info: 42,
  },
  {
    key: '6',
    title: '이용시간',
    info: 42,
  },
  {
    key: '7',
    title: '사이트',
    info: 42,
  },
  {
    key: '8',
    title: '요금',
    info: 42,
  },
  {
    key: '9',
    title: '성별',
    info: 42,
  },
  {
    key: '10',
    title: '경력',
    info: 42,
  },
]

const columns = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'info',
    dataIndex: 'info',
    key: 'info',
  },
]

function DetailTable() {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default DetailTable
