import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import DetailData from './DetailData.js'

function DetailMain() {
  // 게임 상세정보
  const [didi, setdidi] = useState(DetailData)

  // 선택된 게임
  const [game, setGame] = useState(undefined)
  const { game_no } = useParams()

  useEffect(() => {
    console.log(game_no)

    const initial_games = {
      content: [
        {
          game_no: 1,
          title: '모집합니다.',
          img: '/images/0916',
          nickname: '판다',
          rate: '3.6',
          court_name: '도곡테니스장',
          time: '20:00',
          content: '모집합니다.',
          gender_type: 'M',
          age_type: '10',
          str_dt: 2020 - 10 - 11,
          end_dt: 2020 - 10 - 12,
          str_dtm: '2020-10-11 15:00:00',
          end_dtm: '2020-10-11 17:00:00',
          loc_si_do: '서울시',
          loc_si_gun_gu: '동작구',
          fst_reg_dtm: 2,
          lst_upd_dtm: '?',
          st_dv_cd: '',
        },
        {
          game_no: 2,
          title: '모집합니다.',
          img: '/images/0916',
          nickname: '곰',
          rate: '4.0',
          court_name: '도곡테니스장',
          time: '20:00',
          content: '모집합니다.',
          gender_type: 'M',
          age_type: '10',
          str_dt: 2020 - 10 - 11,
          end_dt: 2020 - 10 - 12,
          str_dtm: '2020-10-11 15:00:00',
          end_dtm: '2020-10-11 17:00:00',
          loc_si_do: '서울시',
          loc_si_gun_gu: '동작구',
          fst_reg_dtm: 2,
          lst_upd_dtm: '?',
          st_dv_cd: '',
        },
        {
          game_no: 3,
          title: '모집합니다.',
          img: '/images/0916',
          nickname: '곰',
          rate: '4.0',
          court_name: '도곡테니스장',
          time: '20:00',
          content: '모집합니다.',
          gender_type: 'M',
          age_type: '10',
          str_dt: 2020 - 10 - 11,
          end_dt: 2020 - 10 - 12,
          str_dtm: '2020-10-11 15:00:00',
          end_dtm: '2020-10-11 17:00:00',
          loc_si_do: '서울시',
          loc_si_gun_gu: '동작구',
          fst_reg_dtm: 2,
          lst_upd_dtm: '?',
          st_dv_cd: '',
        },
        {
          game_no: 4,
          title: '모집합니다.',
          img: '/images/0916',
          nickname: '곰',
          rate: '4.0',
          court_name: '도곡테니스장',
          time: '20:00',
          content: '모집합니다.',
          gender_type: 'M',
          age_type: '10',
          str_dt: 2020 - 10 - 11,
          end_dt: 2020 - 10 - 12,
          str_dtm: '2020-10-11 15:00:00',
          end_dtm: '2020-10-11 17:00:00',
          loc_si_do: '서울시',
          loc_si_gun_gu: '동작구',
          fst_reg_dtm: 2,
          lst_upd_dtm: '?',
          st_dv_cd: '',
        },
        {
          game_no: 5,
          title: '모집합니다.',
          img: '/images/0916',
          nickname: '곰',
          rate: '4.0',
          court_name: '도곡테니스장',
          time: '20:00',
          content: '모집합니다.',
          gender_type: 'M',
          age_type: '10',
          str_dt: 2020 - 10 - 11,
          end_dt: 2020 - 10 - 12,
          str_dtm: '2020-10-11 15:00:00',
          end_dtm: '2020-10-11 17:00:00',
          loc_si_do: '서울시',
          loc_si_gun_gu: '동작구',
          fst_reg_dtm: 2,
          lst_upd_dtm: '?',
          st_dv_cd: '',
        },
        {
          game_no: 6,
          title: '모집합니다.',
          img: '/images/0916',
          nickname: '판다',
          rate: '3.6',
          court_name: '도곡테니스장',
          time: '20:00',
          content: '모집합니다.',
          gender_type: 'M',
          age_type: '10',
          str_dt: 2020 - 10 - 11,
          end_dt: 2020 - 10 - 12,
          str_dtm: '2020-10-11 15:00:00',
          end_dtm: '2020-10-11 17:00:00',
          loc_si_do: '서울시',
          loc_si_gun_gu: '동작구',
          fst_reg_dtm: 2,
          lst_upd_dtm: '?',
          st_dv_cd: '',
        },
        {
          game_no: 7,
          title: '모집합니다.',
          img: '/images/0916',
          nickname: '곰',
          rate: '4.0',
          court_name: '도곡테니스장',
          time: '20:00',
          content: '모집합니다.',
          gender_type: 'M',
          age_type: '10',
          str_dt: 2020 - 10 - 11,
          end_dt: 2020 - 10 - 12,
          str_dtm: '2020-10-11 15:00:00',
          end_dtm: '2020-10-11 17:00:00',
          loc_si_do: '서울시',
          loc_si_gun_gu: '동작구',
          fst_reg_dtm: 2,
          lst_upd_dtm: '?',
          st_dv_cd: '',
        },
        {
          game_no: 8,
          title: '모집합니다.',
          img: '/images/0916',
          nickname: '곰',
          rate: '4.0',
          court_name: '도곡테니스장',
          time: '20:00',
          content: '모집합니다.',
          gender_type: 'M',
          age_type: '10',
          str_dt: 2020 - 10 - 11,
          end_dt: 2020 - 10 - 12,
          str_dtm: '2020-10-11 15:00:00',
          end_dtm: '2020-10-11 17:00:00',
          loc_si_do: '서울시',
          loc_si_gun_gu: '동작구',
          fst_reg_dtm: 2,
          lst_upd_dtm: '?',
          st_dv_cd: '',
        },
        {
          game_no: 9,
          title: '모집합니다.',
          img: '/images/0916',
          nickname: '곰',
          rate: '4.0',
          court_name: '도곡테니스장',
          time: '20:00',
          content: '모집합니다.',
          gender_type: 'M',
          age_type: '10',
          str_dt: 2020 - 10 - 11,
          end_dt: 2020 - 10 - 12,
          str_dtm: '2020-10-11 15:00:00',
          end_dtm: '2020-10-11 17:00:00',
          loc_si_do: '서울시',
          loc_si_gun_gu: '동작구',
          fst_reg_dtm: 2,
          lst_upd_dtm: '?',
          st_dv_cd: '',
        },
        {
          game_no: 10,
          title: '모집합니다.',
          img: '/images/0916',
          nickname: '곰',
          rate: '4.0',
          court_name: '도곡테니스장',
          time: '20:00',
          content: '모집합니다.',
          gender_type: 'M',
          age_type: '10',
          str_dt: 2020 - 10 - 11,
          end_dt: 2020 - 10 - 12,
          str_dtm: '2020-10-11 15:00:00',
          end_dtm: '2020-10-11 17:00:00',
          loc_si_do: '서울시',
          loc_si_gun_gu: '동작구',
          fst_reg_dtm: 2,
          lst_upd_dtm: '?',
          st_dv_cd: '',
        },
      ],
    }

    const selected = initial_games.content.find(
      (game) => game.game_no === game_no
    )
    setGame(selected)
  })

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
