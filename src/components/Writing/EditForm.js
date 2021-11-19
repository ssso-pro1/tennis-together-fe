import { Row, Col, Input, Form } from 'antd'
import React, { useState, useEffect } from 'react'

import axios from 'axios'
import baseApi from 'service/baseApi'

import styled from 'styled-components'
import Button from 'styled-components/Buttons'
import Flexbox from 'styled-components/Flexbox'
import Selects from 'components/Writing/select'

import MapModal from 'components/Writing/MapModal'
import { useHistory, useParams } from 'react-router'

function EditForm() {
  const Write = styled.div`
    .absolute {
      padding-top: 2rem;
      position: absolute;
      width: 100%;
      z-index: 2;

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
      padding: 300px 0 0 0;
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
    .courtInfo {
      display: none;
    }
  `
  const [form] = Form.useForm()
  const history = useHistory()
  const { gameNo } = useParams()

  const [courtInfo, setCourtInfo] = useState('')

  // map container에서 지도정보 가져오기
  function onAddressChange(value) {
    console.log('onAddressChange', value)
    form.setFieldsValue({
      court: `${value.name}`,
      courtNo: ` ${value.courtNo}`,
    })
  }

  // 해당 발행글 가져오기
  useEffect(() => {
    axios(`/games/${gameNo}`) //
      .then((response) => {
        console.log('해당글 가져옴?', response)

        const prevData = response.data

        const historyType = {
          '': '무관',
          1: '6개월 미만',
          2: '6개월이상 ~ 1년 미만',
          3: '1년 이상 ~ 5년 미만',
          4: '5년 이상',
        }

        form.setFieldsValue({
          title: prevData.title,
          genderType: prevData.genderType,
          historyType: historyType[prevData.historyType],
          ageType: prevData.ageType + '대',
          // strDt: prevData.strDt,
          content: prevData.content,
          court: prevData.court.name,
          courtNo: prevData.courtNo,
        })
      })
  }, [])

  // 발행하기
  const onFinish = (values) => {
    baseApi
      .patch(
        `/games/${gameNo}`,
        {
          title: values.title,
          genderType: values.genderType,
          historyType: Number(values.historyType),
          ageType: Number(values.ageType),
          strDt: values.strDt,
          content: values.content,
          courtNo: values.courtNo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(function (response) {
        console.log('수정완료', response)
        alert('수정이 완료되었습니다')
        history.push(`/detail/${gameNo}`)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div>
      <Row>
        <Col span={22} offset={1}>
          <Write>
            <Form form={form} onFinish={onFinish} courtInfo={courtInfo}>
              <div className="absolute">
                <Flexbox ai={'flex-start'} jc={'space-between'}>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: '제목을 입력하세요',
                      },
                    ]}
                  >
                    <Input
                      bordered={false}
                      placeholder="제목을 입력하세요"
                      className="title"
                    ></Input>
                  </Form.Item>

                  <Button fs={'16px'} type="submit">
                    발행하기
                  </Button>
                </Flexbox>

                <MapModal
                  setCourtInfo={setCourtInfo}
                  courtInfo={courtInfo}
                  onAddressChange={onAddressChange}
                />
                <Selects />
              </div>
              <Form.Item
                name="content"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input.TextArea
                  bordered={false}
                  className="textarea"
                  placeholder="추가정보를 입력하세요"
                />
              </Form.Item>
              <Form.Item
                name="courtNo"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input.TextArea
                  bordered={false}
                  className="courtInfo"
                  placeholder="추가정보를 입력하세요"
                />
              </Form.Item>
            </Form>
          </Write>
        </Col>
      </Row>
    </div>
  )
}

export default EditForm
