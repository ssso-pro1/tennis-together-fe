import { Modal } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { SearchPlace } from './SearchPlace'
import MapContainer from './MapContainer'

const MapModal = ({ setValue }) => {
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
        <input
          type="text"
          placeholder="주소를 입력하세요"
          onClick={showModal}
        />
      </InputGroup>

      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <SearchPlace showModal={showModal} onFinish={onFinish} />
        <MapContainer searchPlace={inputText} setValue={setValue} />
      </Modal>
    </>
  )
}

export default MapModal
