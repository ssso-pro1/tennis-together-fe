import { Form } from 'antd'
import React, { useState } from 'react'
import { useLocation } from 'react-router'
import Write from './Write'

const Writing = ({ onSubmitSuccess }) => {
  const location = useLocation()
  const [form] = Form.useForm()
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

  if (location.onSubmitSuccess) {
    onSubmitSuccess = location.onSubmitSuccess
  }

  const onFinish = (values) => {
    onSubmitSuccess(values)
  }

  return (
    <div>
      <Write
        setCourtInfo={setCourtInfo}
        courtInfo={courtInfo}
        onAddressChange={onAddressChange}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
        onFinish={onFinish}
        location={location}
      />
    </div>
  )
}

export default Writing
