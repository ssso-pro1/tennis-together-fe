import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { Row, Col } from 'antd'

import Navbar from './Common/Navbar'
import DetailData from './DetailData'
import DetailTable from './DetailTable'
import DetailComments from './DetailComments'

import AvatarBase from '../styled-components/Avatar'
import Button from '../styled-components/Buttons'

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

  const Flexbox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `
  const TitleWrap = styled.div`
    padding: 32px 48px 32px 0;

    h1 {
      font-size: 48px;
      font-weight: bold;
    }
  `

  const Anchor = Button.withComponent('a')
  const [commentsVisible, setCommentsVisible] = useState(false)

  const showComment = () => {
    setCommentsVisible(!commentsVisible)
  }

  return (
    <div>
      <Navbar />
      <Row>
        <Col span={12} offset={6}>
          <TitleWrap>
            <h1>{didi.title}</h1>
          </TitleWrap>
          <AvatarBase>
            <a href="" className="avatarImg" size={'24px'}>
              {/* <img src="" alt="" /> */}
            </a>
            <a href="" className="nickname">
              <strong>연두언니</strong>
            </a>
            <time dateTime="2021-01-01">2021.01.01</time>
          </AvatarBase>
          <DetailTable />
          <Flexbox>
            <Button Outlined height={'40px'} width={'200px'}>
              신청하기
            </Button>
          </Flexbox>
          <Flexbox>
            <Button height={'40px'}>수정</Button>
            <Button height={'40px'}>삭제</Button>
          </Flexbox>
          <p
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={showComment}
          >
            댓글
          </p>
          {commentsVisible === true ? <DetailComments /> : null}
        </Col>
      </Row>
    </div>
  )
}

export default DetailMain
