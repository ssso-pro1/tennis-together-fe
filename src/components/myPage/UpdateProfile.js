import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../service/authState'

import baseApi from '../../service/baseApi'
import { Form, Select, Input, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { historyT, locSdData, locSkkData } from 'components/common/constants'
import styled from 'styled-components'
import AvatarBase from 'components/common/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import Button from 'components/common/Buttons'

const UpdateProfile = () => {
  const history = useHistory()
  history.push('/pages/updateprofile')
  const { user, setUser } = useContext(UserContext)

  const { Option } = Select
  const [form] = Form.useForm()

  const [locSds, setLocSds] = React.useState(locSdData[0].value)
  const [locSkks, setLocSkks] = React.useState(locSkkData[locSds][0].value)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [profileUrl, setProfileUrl] = useState(null)
  const [nickInput, setNickInput] = useState(null)

  const handleLocSdChange = (value) => {
    setLocSds(value)
  }

  const handleLocSkkChange = (value) => {
    setLocSkks(value)
  }

  const handlePhone = (e) => {
    e.preventDefault()
    const phoneNumber = e.target.value
    setPhoneNumber(phoneNumber)
    console.log(phoneNumber)
  }

  // useEffect(() => {
  //   console.log(profileUrl)
  //   // setProfileUrl()
  // }, [profileUrl])

  // 닉네임 수정 시 set
  const handleNick = (e) => {
    e.preventDefault()
    const nick = e.target.value
    setNickInput(nick)
    console.log('닉수정', nickInput)
  }

  // 닉네임 중복확인
  const confirmNick = (e) => {
    e.preventDefault()
    console.log('닉네임중복확인 (api)')
    baseApi
      .get(`/users/nickname/${nickInput}`, {
        nickname: nickInput,
      })
      .then(function (response) {
        console.log(response)
        console.log('response된닉', nickInput)
        alert('사용가능한 닉네임입니다.')
        setNickInput(nickInput)
      })
      .catch((error) => {
        console.log(error)
        console.log('수정실패된 nick', nickInput)
        alert('이미 사용중인 닉네임입니다.')
      })
  }

  const uid = user && user.uid

  // 이미지 업로드
  const changeImg = {
    name: 'file',
    action: '/profile/pic',
    data: {
      uid: uid,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        setProfileUrl(info.file)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
        console.log(uid)
      }
    },
  }

  // 수정 요청  ---------------------------------------- -------------------------------
  const onFinish = async (values) => {
    baseApi
      .patch(`/users/${uid}`, {
        phone: phoneNumber,
        nickname: nickInput,
        birth: values.birth,
        gender: values.gender,
        history: parseInt(values.history),
        profileUrl: profileUrl && profileUrl.uid,
        locSd: values.locSd,
        locSkk: values.locSkk,
      })
      .then(function (response) {
        console.log(response)
        console.log('수정완료된 vlaues', values)
        console.log('수정요청한 닉넴', nickInput)
        alert('프로필 수정이 완료되었습니다.')
        setUser(user)
        history.push('/pages/updateprofile')
      })
      .catch((error) => {
        console.log(error)
        console.log('수정실패된 vlaues', values)
        alert('프로필 수정에 실패했습니다.')
      })
  }

  if (!user) return <></>
  // console.log(profileUrl)
  // console.log('프로필사진', user.profileUrl)

  return (
    <>
      <Flexbox>
        <SignUpSection>
          <h2>프로필 수정</h2>
          <AvatarBase className="avatar">
            {user.profileUrl ? (
              <img
                className="avatarImg"
                // style={{ width: '2.2rem' }}
                src={user.profileUrl}
                alt=""
              />
            ) : (
              <img
                className="avatarImg"
                // style={{ width: '2.2rem' }}
                src={DefaultImg}
                alt={DefaultImg}
              />
            )}
          </AvatarBase>

          <Upload {...changeImg}>
            <Button
              icon={<UploadOutlined />}
              Secondary
              height={'30px'}
              width={'70px'}
              style={{ fontSize: '8px', fontWeight: '100' }}
              // onClick={ChangeImg}
            >
              사진 선택
            </Button>
          </Upload>
          <br />
          <InputData>
            <Form onFinish={onFinish} form={form}>
              <Nickname>
                <Form.Item name="nickname" initialValue={user.nickname}>
                  <Input
                    type="text"
                    name="nickname"
                    placeholder={nickInput}
                    style={{ width: 220 }}
                    onChange={handleNick}
                  />
                </Form.Item>
                <Button
                  height={'32px'}
                  width={'80px'}
                  htmlType="button"
                  Outlined
                  style={{ fontSize: '12px', fontWeight: '400' }}
                  onClick={(e) => {
                    confirmNick(e)
                  }}
                  // onClick={confirmNick}
                >
                  중복확인
                </Button>
              </Nickname>

              <Form.Item name="locSd">
                <Select
                  placeholder={user.locCd.locSdName}
                  style={{ width: 300 }}
                  onChange={handleLocSdChange}
                >
                  {locSdData.map((locSd) => (
                    <Option key={locSd.value} value={locSd.value}>
                      {locSd.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="locSkk">
                <Select
                  placeholder={user.locCd.locSkkName}
                  style={{ width: 300 }}
                  onChange={handleLocSkkChange}
                >
                  {locSkkData[locSds].map((locSkk) => (
                    <Option key={locSkk.value} value={locSkk.value}>
                      {locSkk.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="gender">
                <Select
                  placeholder={user.gender}
                  style={{ width: 300 }}
                  required
                >
                  <Option name="gender" value="여성">
                    여성
                  </Option>
                  <Option name="gender" value="남성">
                    남성
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item name="history">
                <Select
                  placeholder={historyT[user.history]}
                  style={{ width: 300, height: 40 }}
                >
                  <Option name="history" value="1">
                    6개월미만
                  </Option>
                  <Option name="history" value="2">
                    6개월이상~1년미만
                  </Option>
                  <Option name="history" value="3">
                    1년이상~5년이하
                  </Option>
                  <Option name="history" value="4">
                    5년이상
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item name="birth">
                <Input
                  type="text"
                  name="birth"
                  placeholder={user.birth}
                  style={{ width: 300, height: 40 }}
                />
              </Form.Item>

              <Form.Item name="phone">
                <Input
                  type="text"
                  name="phone"
                  placeholder={user.phone}
                  onChange={handlePhone}
                  style={{ width: 300, height: 40 }}
                />
              </Form.Item>
              <br />

              <Form.Item>
                <Button style={{ width: 300 }} htmlType="submit">
                  수정하기
                </Button>
              </Form.Item>
            </Form>
          </InputData>
        </SignUpSection>
      </Flexbox>
    </>
  )
}

export default UpdateProfile

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 1.8rem;
    margin: 5rem;
  }
  .avatar {
    display: flex;
    justify-content: center;
    img {
      width: 5rem;
    }
  }
`

const SignUpSection = styled.div`
  padding-bottom: 20%;
`

const InputData = styled.div`
  display: flex;
  flex-direction: column;
`
const Birth = styled.div``

const Nickname = styled.div`
  display: flex;
`
