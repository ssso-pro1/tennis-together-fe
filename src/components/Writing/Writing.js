import { Row, Col, Input, Form } from 'antd'
import React, { useState, useEffect } from 'react'

import axios from 'axios'

import styled from 'styled-components'
import Button from 'styled-components/Buttons'
import Flexbox from 'styled-components/Flexbox'
import Selects from 'components/Writing/select'

import MapModal from 'components/Writing/MapModal'

function Writing() {
  const Write = styled.div`
    .absolute {
      padding-top: 2rem;
      position: absolute;
      width: 100%;

      .title {
        width: 90%;
        height: 66px;
        font-size: 48px;
        font-weight: bold;
        border: none;
        padding: 0;
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
    }

    .textarea {
      position: absolute;
      top: 250px;
      border: none;
      width: 100%;
      min-height: 100vh;
      resize: none;
      &:hover {
        border: none;
      }
      &:focus {
        outline: none;
      }
    }
  `

  const { TextArea } = Input

  const [value, setValue] = useState('')

  // **********************************************
  // ant-design 사용시
  // 1. input과 textarea가 동시에 입력되는 오류 발생
  // 2. Select로 handlechange함수 props가 안됨
  // *********************************************
  const handleChange = (e) => {
    console.log('입력값', e.target.value)
    setValue(e.target.value)
  }
  // const submit = (e) => {
  //   setValue('')
  // }

  return (
    <div>
      <Row>
        <Col span={22} offset={1}>
          <Write>
            <form>
              <div className="absolute">
                <Flexbox ai={'flex-start'} jc={'space-between'}>
                  <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="제목을 입력하세요"
                    className="title"
                  ></Input>
                  <Button fs={'16px'}>발행하기</Button>
                </Flexbox>
                <MapModal />
                <Selects />
              </div>
              <TextArea
                value={value}
                onChange={handleChange}
                className="textarea"
                placeholder="추가정보를 입력하세요"
              ></TextArea>
            </form>
          </Write>
        </Col>
      </Row>
    </div>
  )
}

export default Writing
