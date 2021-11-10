import { Modal } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { SerchPlace } from './SerchPlace'

const MapModal = () => {
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
        <SerchPlace showModal={showModal} />
      </Modal>
    </>
  )
}

export default MapModal
