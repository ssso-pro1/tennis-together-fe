import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import axios from 'axios'

import styled from 'styled-components'

export default function DetailTable() {
  const { gameNo } = useParams()

  const [info, setInfo] = useState([])

  // useEffect(() => {
  //   fetch('http://localhost:3000/games?gameNo=1')
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((data) => {
  //       console.log(data)
  //       setInfo(data)
  //     })
  // }, [])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/games?gameNo=1')
        setInfo(response.data)
      } catch (e) {}
    }
    fetchUsers()
  }, [])

  const TableStyle = styled.div`
    .info-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;

      tr {
        font-size: 12px;
        text-align: left;
        vertical-align: top;
      }

      th,
      td {
        padding: 12px;
      }

      th {
        width: 160px;
        font-weight: 400;
      }

      td {
        padding-left: 0;
        color: #9999;
      }
    }
  `
  return (
    <div>
      {info.map((infos) => (
        <TableStyle key={infos.gameNo}>
          <table class="info-table">
            <tbody>
              <tr>
                <th scope="row">모집날짜</th>
                <td>{infos.strDt}</td>
              </tr>
              <tr>
                <th scope="row">장소</th>
                <td>무료 배송</td>
              </tr>
              <tr>
                <th scope="row">주소</th>
                <td>배송불가 지역이 없습니다</td>
              </tr>
              <tr>
                <th scope="row">위치정보</th>
                <td>2,500원 (최초 배송비가 무료인 경우 5,000원 부과)</td>
              </tr>
              <tr>
                <th scope="row">전화번호</th>
                <td></td>
              </tr>
              <tr>
                <th scope="row">이용시간</th>
                <td>(00000) 서울 종로구 누하동</td>
              </tr>
              <tr>
                <th scope="row">사이트</th>
                <td>(00000) 서울 종로구 누하동</td>
              </tr>
              <tr>
                <th scope="row">요금</th>
                <td>(00000) 서울 종로구 누하동</td>
              </tr>
              <tr>
                <th scope="row">성별</th>
                <td>{infos.genderType}</td>
              </tr>
              <tr>
                <th scope="row">경력</th>
                <td>(00000) 서울 종로구 누하동</td>
              </tr>
              <tr>
                <th scope="row">연령대</th>
                <td>{infos.ageType}</td>
              </tr>
            </tbody>
          </table>
          <p>{infos.content}</p>
        </TableStyle>
      ))}
    </div>
  )
}
