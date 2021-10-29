import React, { useState } from 'react'
import DetailData from './DetailData.js'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

function DetailMain() {
  const [didi, setdidi] = useState(DetailData)

  return (
    <div>
      <h1 className="detail-main-title">{didi.title}</h1>
      <div className="detail-user-info">
        <a href="/" className="avarta-24">
          <Avatar icon={<UserOutlined />} />
          {/* <img src="" alt="연두언니" /> */}
        </a>
        <div className="info">
          <a href="/" className="username">
            <strong>연두방구</strong>
          </a>
          <time dateTime="2021-01-01">2021.01.01</time>
        </div>
      </div>

      <table className="product-table">
        <tbody>
          <tr>
            <th scope="row">모집날짜</th>
            <td>
              <time dateTime="2021-01-01">2021.01.01</time>
            </td>
          </tr>
          <tr>
            <th scope="row">장소</th>
            <td>수박바 테니스코트장</td>
          </tr>
          <tr>
            <th scope="row">주소</th>
            <td>서울시 강남구 테헤란로 14길 48</td>
          </tr>
          <tr>
            <th scope="row">위치정보</th>
            <td>지도</td>
          </tr>
          <tr>
            <th scope="row">전화번호</th>
            <td>
              <a href="tel:070-8752-9553">070-8452-9553</a>
            </td>
          </tr>
          <tr>
            <th scope="row">이용시간</th>
            <td>10:00 ~ 20:00</td>
          </tr>
          <tr>
            <th scope="row">사이트</th>
            <td>
              <a href="/" target="_blank">
                www.naver.com
              </a>
            </td>
          </tr>
          <tr>
            <th scope="row">요금</th>
            <td>무료</td>
          </tr>
          <tr>
            <th scope="row">성별</th>
            <td>무관</td>
          </tr>
          <tr>
            <th scope="row">경력</th>
            <td>무관</td>
          </tr>
        </tbody>
      </table>

      <div>
        <button type="button" className="btn-primary">
          신청하기
        </button>
        <div>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </div>
    </div>
  )
}

export default DetailMain
