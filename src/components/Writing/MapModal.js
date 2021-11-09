import { Modal } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import MapContainer from '../Detail/MapContainer'

const MapModal = () => {
  const InputGroup = styled.div`
    width: 100%;

    input {
      width: 100%;
      height: 46px;
      margin: 20px 0;
    }
  `
  const [isModalVisible, setIsModalVisible] = useState(false)

  function showModal() {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
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
        <InputGroup>
          <input
            type="text"
            placeholder="주소를 입력하세요"
            onClick={showModal}
          />
        </InputGroup>
        <MapContainer />
        <strong>서울시 마포구 합정동 173-8</strong>
        <p>서울시 마포구 합정터널로 200-1</p>
      </Modal>
    </>
  )
}

export default MapModal
