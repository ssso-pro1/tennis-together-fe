import { Form } from 'antd'
import React, { useState, useEffect } from 'react'
import baseApi from 'service/baseApi'
import { useHistory, useParams } from 'react-router'
import { historyType } from 'components/common/constants'
import Write from './Write'

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

export default EditForm
