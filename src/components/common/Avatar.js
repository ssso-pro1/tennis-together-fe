import AvatarBase from 'components/common/AvatarBase'
import DefaultImg from 'components/common/images/img-user-default.png'
import PopUpProfile from 'components/popUpProfile/PopUpProfile'
import React, { useState } from 'react'
import { Modal } from 'antd'

const Avatar = ({ data, userImg, nickName, updTime = false }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const modalOpen = () => {
    setIsModalVisible(true)
  }
  return (
    <div>
      <AvatarBase>
        <a href="#!" className="avatarImg">
          <img src={userImg || DefaultImg} alt="프로필 이미지" />
        </a>
        <strong className="nickname" onClick={modalOpen}>
          {nickName}
        </strong>
        {updTime && <time>{data.updDtm.split('T')[0]}</time>}
      </AvatarBase>
      {isModalVisible && (
        <Modal
          title="프로필 및 리뷰리스트"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
        >
          <PopUpProfile userData={data} nickName={nickName} />
        </Modal>
      )}
    </div>
  )
}

export default Avatar
