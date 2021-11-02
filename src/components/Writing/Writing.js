import React, { useState } from 'react'
import { Row, Col } from 'antd'

import styled from 'styled-components'
import Button from '../../styled-components/Buttons'
import Flexbox from '../../styled-components/Flexbox'

import Selects from '../Writing/select'
import MapModal from '../Detail/MapModal'

function Writing() {
  const Header = styled.div`
    padding-top: 2rem;

    input {
      width: 90%;
      height: 66px;
      font-size: 48px;
      font-weight: bold;
      &::placeholder {
        color: rgb(134, 142, 150);
      }
      &:focus {
        outline: none;
      }
    }
    button {
      margin-top: 10px;
    }
  `

  return (
    <div>
      <Row>
        <Col span={22} offset={1}>
          <Header>
            <Flexbox ai={'flex-start'} jc={'space-between'}>
              <input placeholder="제목을 입력하세요"></input>
              <Button fs={'16px'}>발행하기</Button>
            </Flexbox>
          </Header>
          <MapModal />
          <Selects />

          <textarea placeholder="추가정보를 입력하세요"></textarea>
        </Col>
      </Row>
    </div>
  )
}

export default Writing
