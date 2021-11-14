import { Modal, Input, Form } from 'antd'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SearchPlace } from './SearchPlace'
import MapContainer from './MapContainer'
import axios from 'axios'

const MapModal = ({ setCourtInfo, onAddressChange }) => {
  const [courts, setCourts] = useState(null)
  const [loading, setLoading] = useState(true)

  //코트정보 불러오기
  useEffect(() => {
    axios(`/courts`) //
      .then((response) => {
        console.log('불러오기완', response)
        setCourts(response.data)
        setLoading(false)
      })
  }, [])

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
  function showModal() {
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
    console.log('Success:', values.address)
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

        {loading ? null : (
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
