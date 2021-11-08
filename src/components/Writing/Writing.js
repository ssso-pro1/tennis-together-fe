import { Row, Col } from 'antd'
import { Select, DatePicker } from 'antd'

import axios from 'axios'

import styled from 'styled-components'
import Button from 'styled-components/Buttons'
import Flexbox from 'styled-components/Flexbox'

import MapModal from 'components/Detail/MapModal'
import { useRef } from 'react'

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

    textarea {
      padding-top: 250px;
      width: 100%;
      max-height: 100vh;
      resize: none;
    }
  `
  const { Option } = Select
  const SelectWrap = styled.div`
    padding-bottom: 20px;
    .form-select {
      margin-right: 20px;
    }
  `

  function newPost(e) {
    e.preventDefault()
    console.log(titleRef.current.value)
    console.log(textRef.current.value)
    console.log(genderRef.current.value)
    console.log(ageRef.current.value)
    console.log(historyRef.current.value)
    console.log(dateRef.current.value)

    axios
      .post('http://localhost:3000/games', {
        title: titleRef.current.value,
        content: textRef.current.value,
        genderType: genderRef.current.value,
        historyType: historyRef.current.value,
        ageType: ageRef.current.value,
        strDt: dateRef.current.value,
      })
      .then(function (response) {
        alert('모집글이 발행되었습니다')
        console.log(response)
      })
      .catch(function (error) {
        console.log(error.response.data)
      })
  }

  const titleRef = useRef(null)
  const textRef = useRef(null)
  const genderRef = useRef(null)
  const ageRef = useRef(null)
  const historyRef = useRef(null)
  const dateRef = useRef(null)

  return (
    <div>
      <Row>
        <Col span={22} offset={1}>
          <Write>
            <form onSubmit={newPost}>
              <div className="absolute">
                <Flexbox ai={'flex-start'} jc={'space-between'}>
                  <input
                    placeholder="제목을 입력하세요"
                    className="title"
                    ref={titleRef}
                  ></input>
                  <Button fs={'16px'} onClick={newPost}>
                    발행하기
                  </Button>
                </Flexbox>
                <MapModal />
                <SelectWrap>
                  <select
                    className="form-select"
                    defaultValue="gender"
                    style={{ width: 200 }}
                    placeholder="성별"
                    ref={genderRef}
                  >
                    <option value="gender">성별</option>
                    <option value="남성">여성</option>
                    <option value="여성">남성</option>
                  </select>
                  <select
                    className="form-select"
                    defaultValue="career"
                    style={{ width: 200 }}
                    placeholder="연령대"
                    ref={ageRef}
                  >
                    <option value="career">연령대</option>
                    <option value="1">10대</option>
                    <option value="2">20대</option>
                    <option value="3">30대</option>
                    <option value="4">40대</option>
                    <option value="5">50대</option>
                  </select>
                  <select
                    className="form-select"
                    defaultValue="career"
                    style={{ width: 200 }}
                    placeholder="경력"
                    ref={historyRef}
                  >
                    <option value="career">경력</option>
                    <option value="1">~1년</option>
                    <option value="2">~2년</option>
                    <option value="3">~3년</option>
                    <option value="4">3년 이상</option>
                  </select>

                  <input
                    ref={dateRef}
                    type="date"
                    placeholder="모집날짜"
                    style={{ width: 200 }}
                  />
                </SelectWrap>
              </div>
              <textarea
                ref={textRef}
                placeholder="추가정보를 입력하세요"
              ></textarea>
            </form>
          </Write>
        </Col>
      </Row>
    </div>
  )
}

export default Writing
