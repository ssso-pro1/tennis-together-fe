import React from 'react'
import axios from 'axios'

import Navbar from 'components/Common/Navbar'
import Profile from './Profile'
import { Select } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import Flexbox from 'styled-components/Flexbox'
import Button from 'styled-components/Buttons'
import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'

function Notifications() {
  const { Option } = Select
  const approveGame = () => {
    if (window.confirm('수락 하시겠습니까?')) {
      axios
        // .post(`/games/${gameNo}/approve/${userUid}`)
        .then(function (response) {
          console.log('수락완료', response)
          alert('수락 되었습니다')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const cancelGame = () => {
    if (window.confirm('거절 하시겠습니까?')) {
      axios
        // .post(`/games/${gameNo}/cancel`)
        .then(function (response) {
          console.log('거절완료', response)
          alert('거절 되었습니다')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <Navbar />
      <Flexbox
        style={{
          height: '70px',
          borderBottom: '1px solid lightgrey',
          marginBottom: '50px',
        }}
      >
        <h2 style={{ fontWeight: '700', fontSize: '20px', width: '25%' }}>
          알림
        </h2>
        <div style={{ width: '50%' }}>
          <Select
            className="form-select"
            defaultValue="1"
            style={{ width: 500 }}
            placeholder="모든알림"
          >
            <Option value="1">모든알림</Option>
            <Option value="2">게임신청</Option>
            <Option value="3">게임수락</Option>
          </Select>
        </div>
        <Button Secondary height={'30px'} width={'60px'} fs={'14px'}>
          검색
        </Button>
      </Flexbox>
      <Flexbox>
        <Profile />
        <div style={{ width: '55%' }}>
          <AvatarBase>
            <a
              href=""
              className="avatarImg"
              style={{ height: '40px', width: '40px' }}
            >
              <img src={DefaultImg} alt={DefaultImg} />
            </a>
            <a
              href=""
              className="nickname"
              style={{ fontSize: '16px', fontWeight: '700' }}
            >
              <strong>코코</strong>
            </a>
            <CheckCircleOutlined
              style={{ fontSize: '20px', cursor: 'pointer' }}
              onClick={approveGame}
            />
            <CloseCircleOutlined
              style={{ fontSize: '20px', cursor: 'pointer' }}
              onClick={cancelGame}
            />
          </AvatarBase>
        </div>
      </Flexbox>
    </div>
  )
}

export default Notifications
