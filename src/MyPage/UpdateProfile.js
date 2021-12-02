import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../service/authState'

import baseApi from '../service/baseApi'
import { Form, Select, Input, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { historyType, locSdData, locSkkData } from 'components/Common/constants'
import styled from 'styled-components'
import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import Button from 'styled-components/Buttons'

const UpdateProfile = () => {
  const history = useHistory()
  history.push('/pages/updateprofile')
  const { user, setUser } = useContext(UserContext)

  const [phoneNumber, setPhoneNumber] = useState(null)
  const [profileUrl, setProfileUrl] = useState(null)
  // const [nickname, setNickname] = useState(null)
  // const [birth, setBirth] = useState(null)
  // const [gender, setGender] = useState(null)
  // const [history, setHistory] = useState(null)
  // const [locSd, setLocSd] = useState(null)
  // const [locSkk, setLocSkk] = useState(null)

  const { Option } = Select
  const [form] = Form.useForm()

  const [locSds, setLocSds] = React.useState(locSdData[0].value)
  const [locSkks, setLocSkks] = React.useState(locSkkData[locSds][0].value)

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

  const uid = user && user.uid

  // ant file upload 1
  /*
  const changeImg = {
    name: 'file',
    action: '/profile/pic',
    // body: {
    //   uid: 'uid',
    //   file: user.profileUrl,
    // },
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        const formData = new FormData()
        formData.append('file', info.fileList[0])
        formData.append('uid', uid)
        baseApi.post('/profile/pic', formData)

        message.success(`${info.file.name} file uploaded successfully`)
        // setProfileUrl(profileUrl)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  */

  // ant file upload 2
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
        // setProfileUrl(profileUrl)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  // 수정 요청  ---------------------------------------- -------------------------------
  const onFinish = async (values) => {
    baseApi
      .patch(
        `/users/${uid}`,
        {
          phone: phoneNumber,
          nickname: values.nickname,
          birth: values.birth,
          gender: values.gender,
          history: parseInt(values.history),
          // profileUrl: profileUrl,
          // locSd: values.locSd,
          // locSkk: values.locSkk,
          locSd: values.locSd.toString(),
          locSkk: values.locSkk.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(function (response) {
        console.log(response)
        console.log('수정완료된 vlaues', values)
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

  const confirmNick = () => {
    console.log('닉네임중복확인 (api)')
  }

  // style
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
    Input {
      width: 80%;
    }
    Button {
      width: 20%;
    }
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

  return (
    <>
      <Flexbox>
        <SignUpSection>
          <h2>프로필 수정</h2>
          <AvatarBase className="avatar">
            <img src={DefaultImg} alt={DefaultImg} />
          </AvatarBase>

          <Upload {...changeImg}>
            <Button
              icon={<UploadOutlined />}
              Secondary
              height={'30px'}
              width={'100px'}
              style={{ fontSize: '10px', fontWeight: '400' }}
              // onClick={ChangeImg}
            >
              사진 선택
            </Button>
          </Upload>

          <InputData>
            <Form onFinish={onFinish} form={form}>
              {/* initialValues={losCd} */}

              <Form.Item
                name="locSd"
                initialValue={locSdData[user.locCd.locSd].value}
              >
                <Select
                  // placeholder={<span>시/도</span>}
                  style={{ width: 300 }}
                  onChange={handleLocSdChange}
                >
                  {locSdData.map((locSd) => (
                    <Option
                      key={locSd.value}
                      value={locSd.value}
                      // name={locSd.name}
                    >
                      {locSd.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="locSkk"
                initialValue={locSkkData[locSds][user.locCd.locSkk].value}
                // initialValue={locSkkData[user.locCd.locSkk][locSds].value}
              >
                <Select
                  // defaultValue={locSkkData[locSds][user.locCd.locSkk].value}
                  // placeholder={<span>군/구</span>}
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

              <Form.Item name="gender" initialValue={user.gender}>
                <Select
                  placeholder={<span>성별</span>}
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

              <Form.Item
                name="history"
                initialValue={historyType[user.history]}
              >
                <Select
                  placeholder={<span>경력</span>}
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

              <Form.Item name="birth" initialValue={user.birth}>
                <Input
                  type="text"
                  name="birth"
                  placeholder="생년월일(900327)"
                  style={{ width: 300, height: 40 }}
                />
              </Form.Item>

              <Form.Item name="phone" initialValue={user.phone}>
                <Input
                  type="text"
                  name="phone"
                  placeholder="핸드폰 번호(01012341234)"
                  onChange={handlePhone}
                  style={{ width: 300, height: 40 }}
                />
              </Form.Item>

              <Nickname>
                <Form.Item name="nickname" initialValue={user.nickname}>
                  <Input type="text" name="nickname" placeholder="닉네임" />
                </Form.Item>
                <Button
                  Secondary
                  style={{ fontSize: '12px', fontWeight: '400' }}
                  onClick={() => {
                    confirmNick()
                  }}
                >
                  중복확인
                </Button>
              </Nickname>
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
