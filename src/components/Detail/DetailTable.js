import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'

const dataSource = [
  {
    key: '1',
    title: '모집날짜',
    info: '2021-10-10',
  },
  {
    key: '2',
    title: '장소',
    info: '수박바 테니스코트장',
  },
  {
    key: '3',
    title: '주소',
    info: '서울시 강남구 테헤란로 14길 48',
  },
  {
    key: '4',
    title: '위치정보',
    info: '',
  },
  {
    key: '5',
    title: '전화번호',
    info: '070-4325-8859',
  },
  {
    key: '6',
    title: '이용시간',
    info: '09:00 ~ 20:00',
  },
  {
    key: '7',
    title: '사이트',
    info: 'www,naver.com',
  },
  {
    key: '8',
    title: '요금',
    info: '무료',
  },
  {
    key: '9',
    title: '성별',
    info: '무관',
  },
  {
    key: '10',
    title: '경력',
    info: '무관',
  },
]

const columns = [
  {
    dataIndex: 'title',
    key: 'title',
  },
  {
    dataIndex: 'info',
    key: 'info',
  },
]

const TableStyle = styled(Table)`
  table {
    margin: 40px 0;
    thead {
      display: none;
    }
    tr {
      height: 30px !important;
      td {
        border: none;
        padding: 0 0 25px 0;
        &:first-child {
          color: ${(props) => props.theme.gray};
          width: 20%;
        }
        &:last-child {
          color: black;
          width: 80%;
        }
      }
    }
  }
`

function DetailTable() {
  return (
    <TableStyle dataSource={dataSource} columns={columns} pagination={false} />
  )
}

export default DetailTable
