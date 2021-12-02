import { Modal, Input, Form } from 'antd'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import baseApi from 'service/baseApi'
import SearchPlace from './SearchPlace'
import MapContainer from './MapContainer'

const MapModal = ({ setCourtInfo, onAddressChange }) => {
  const [courts, setCourts] = useState(null)
  const [loading, setLoading] = useState(true)

  //코트정보 불러오기
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await baseApi(`/courts?size=100`) //

      setCourts(res.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const InputGroup = styled.div`
    width: 100%;

    input {
      width: 100%;
      height: 46px;
      margin: 20px 0;
    }
  `
  // 주소검색 modal 창
  const [isModalVisible, setIsModalVisible] = useState(false)

  // modal 함수
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  // 주소검색
  const [inputText, setInputText] = useState('')

  const onFinish = (values) => {
    // console.log('Success:', values.sido)
    // console.log('Success:', values.dong)
    // const address = values.sido + ' ' + values.dong
    // console.log('Success:', address)
    // setInputText(address)
    setInputText(values.address)
  }

  return (
    <>
      <InputGroup>
        <Form.Item
          name="court"
          rules={[
            {
              required: true,
              message: '주소를 입력하세요',
            },
          ]}
        >
          <Input
            placeholder="주소를 입력하세요"
            onClick={showModal}
            bordered={false}
          />
        </Form.Item>
      </InputGroup>

      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <SearchPlace
          showModal={showModal}
          onFinish={onFinish}
          courts={courts}
        />

        {loading || (
          <MapContainer
            courts={courts}
            searchPlace={inputText}
            setCourtInfo={setCourtInfo}
            onAddressChange={onAddressChange}
          />
        )}
      </Modal>
    </>
  )
}

export default MapModal
