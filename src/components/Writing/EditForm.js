import { Row, Col, Input, Form } from 'antd'
import React, { useState, useEffect } from 'react'
import baseApi from 'service/baseApi'
import styled from 'styled-components'
import Button from 'components/common/Buttons'
import Flexbox from 'components/common/Flexbox'
import Selects from 'components/writing/Select'
import MapModal from 'components/writing/MapModal'
import { useHistory, useParams } from 'react-router'
import { historyType } from 'components/common/constants'

const EditForm = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const { gameNo } = useParams()
  const [courtInfo, setCourtInfo] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  // map container에서 지도정보 가져오기
  const onAddressChange = (value) => {
    form.setFieldsValue({
      court: `${value.name}`,
      courtNo: ` ${value.courtNo}`,
    })
    setIsModalVisible(false)
  }

  // 해당 발행글 가져오기
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await baseApi(`/games/${gameNo}`) //
      if (res.data) {
        const prevData = res.data
        form.setFieldsValue({
          title: prevData.title,
          genderType: prevData.genderType,
          historyType: historyType[prevData.historyType],
          ageType: prevData.ageType === 0 ? '무관' : prevData.ageType대,
          content: prevData.content,
          court: prevData.court.name,
          courtNo: prevData.courtNo,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 발행하기
  const onFinish = async (values) => {
    try {
      await baseApi.patch(`/games/${gameNo}`, {
        title: values.title,
        genderType: values.genderType,
        historyType: Number(values.historyType),
        ageType: Number(values.ageType),
        strDt: values.strDt,
        endDt: values.endDt,
        content: values.content,
        courtNo: values.courtNo,
      })

      alert('수정이 완료되었습니다')
      history.push(`/pages/detail/${gameNo}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Row>
        <Col span={22} offset={1}>
          <Write>
            <Form form={form} onFinish={onFinish} courtInfo={courtInfo}>
              <div className="absolute">
                <Flexbox ai={'flex-start'} jc={'space-between'}>
                  {
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
                  }

                  <Button fs={'16px'} type="submit">
                    발행하기
                  </Button>
                </Flexbox>

                <MapModal
                  setCourtInfo={setCourtInfo}
                  courtInfo={courtInfo}
                  onAddressChange={onAddressChange}
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
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
export default EditForm
