import { Grid, Form } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import baseApi from 'service/baseApi'
import Write from './Write'

const { useBreakpoint } = Grid
const Writing = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [courtInfo, setCourtInfo] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  var screens = useBreakpoint()
  console.log(screens)

  // map container에서 지도정보 가져오기
  const onAddressChange = (value) => {
    form.setFieldsValue({
      court: `${value.name}`,
      courtNo: ` ${value.courtNo}`,
    })
    setIsModalVisible(false)
  }

  // 발행하기

  const onFinish = async (values) => {
    try {
      const post = await baseApi.post('/games', {
        title: values.title,
        genderType: values.genderType,
        historyType: Number(values.historyType),
        ageType: Number(values.ageType),
        strDt: values.strDt,
        endDt: values.endDt,
        content: values.content,
        courtNo: values.courtNo,
      })

      alert('발행이 완료되었습니다')
      history.push(`/pages/detail/${post.data.gameNo}`)
    } catch (error) {
      console.log(error)
    }
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
        courtInfo={courtInfo}
      />
    </div>
  )
}

export default Writing
