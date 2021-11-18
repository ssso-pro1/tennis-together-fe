import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ListPage from './ListPage/ListPage'
import styled from 'styled-components'
import Button from '../styled-components/Buttons'
import { Select, Form } from 'antd'

const { Option } = Select

const UserInfo = styled.section`
  margin-top: 25px;
`
const ButtonDiv = styled.div`
  margin-top: 10px;
`

const Search = (props) => {
  const [form] = Form.useForm()

  function handleChange(value) {
    console.log(`selected ${value}`)
  }

  const locSdData = [
    {
      id: 1,
      label: '서울시',
      name: '서울시',
      value: 1,
    },
    {
      id: 2,
      label: '경기도',
      name: '경기도',
      value: 2,
    },
  ]

  const locSkkData = {
    1: [
      { id: 1, label: '종로구', name: '종로구', value: 1 },
      { id: 2, label: '중구', name: '중구', value: 2 },
      { id: 3, label: '용산구', name: '용산구', value: 3 },
      { id: 4, label: '성동구', name: '성동구', value: 4 },
      { id: 5, label: '광진구', name: '광진구', value: 5 },
      { id: 6, label: '동대문구', name: '동대문구', value: 6 },
      { id: 7, label: '중랑구', name: '중랑구', value: 7 },
      { id: 8, label: '성북구', name: '성북구', value: 8 },
      { id: 9, label: '강북구', name: '강북구', value: 9 },
      { id: 10, label: '도봉구', name: '도봉구', value: 10 },
      { id: 11, label: '노원구', name: '노원구', value: 11 },
      { id: 12, label: '은평구', name: '은평구', value: 12 },
      { id: 13, label: '서대문구', name: '서대문구', value: 13 },
      { id: 14, label: '마포구', name: '마포구', value: 14 },
      { id: 15, label: '양천구', name: '양천구', value: 15 },
      { id: 16, label: '강서구', name: '강서구', value: 16 },
      { id: 17, label: '구로구', name: '구로구', value: 17 },
      { id: 18, label: '금천구', name: '금천구', value: 18 },
      { id: 19, label: '영등포구', name: '영등포구', value: 19 },
      { id: 20, label: '동작구', name: '동작구', value: 20 },
      { id: 21, label: '관악구', name: '관악구', value: 21 },
      { id: 22, label: '서초구', name: '서초구', value: 22 },
      { id: 23, label: '강남구', name: '강남구', value: 23 },
      { id: 24, label: '송파구', name: '송파구', value: 24 },
      { id: 25, label: '강동구', name: '강동구', value: 25 },
    ],
    2: [
      { id: 26, label: '수원시', name: '수원시', value: 1 },
      { id: 27, label: '성남시', name: '성남시', value: 2 },
      { id: 28, label: '고양시', name: '고양시', value: 3 },
      { id: 29, label: '용인시', name: '용인시', value: 4 },
      { id: 30, label: '부천시', name: '부천시', value: 5 },
      { id: 31, label: '안산시', name: '안산시', value: 6 },
      { id: 32, label: '안양시', name: '안양시', value: 7 },
      { id: 33, label: '남양주시', name: '남양주시', value: 8 },
      { id: 34, label: '화성시', name: '화성시', value: 9 },
      { id: 35, label: '평택시', name: '평택시', value: 10 },
      { id: 36, label: '의정부시', name: '의정부시', value: 11 },
      { id: 37, label: '시흥시', name: '시흥시', value: 12 },
      { id: 38, label: '파주시', name: '파주시', value: 13 },
      { id: 39, label: '광명시', name: '광명시', value: 14 },
      { id: 40, label: '김포시', name: '김포시', value: 15 },
      { id: 41, label: '군포시', name: '군포시', value: 16 },
      { id: 42, label: '광주시', name: '광주시', value: 17 },
      { id: 43, label: '이천시', name: '이천시', value: 18 },
      { id: 44, label: '양주시', name: '양주시', value: 19 },
      { id: 45, label: '오산시', name: '오산시', value: 20 },
      { id: 46, label: '구리시', name: '구리시', value: 21 },
      { id: 47, label: '안성시', name: '안성시', value: 22 },
      { id: 48, label: '포천시', name: '포천시', value: 23 },
      { id: 49, label: '의왕시', name: '의왕시', value: 24 },
      { id: 50, label: '하남시', name: '하남시', value: 25 },
      { id: 51, label: '여주시', name: '여주시', value: 26 },
      { id: 52, label: '양평군', name: '양평군', value: 27 },
      { id: 53, label: '동두천시', name: '동두천시', value: 28 },
      { id: 54, label: '과천시', name: '과천시', value: 29 },
      { id: 55, label: '가평군', name: '가평군', value: 30 },
      { id: 56, label: '연천군', name: '연천군', value: 31 },
    ],
  }

  const [locSds, setLocSds] = React.useState(locSdData[0].value)
  const [locSkks, setLocSkks] = React.useState(locSkkData[locSds][0].value)
  const [courtData, setCourtData] = React.useState([])
  const [courts, setCourts] = React.useState([courtData][0].courtNo)

  // 1 군구선택
  const handleLocSdChange = (value) => {
    setLocSds(value)
  }

  const handleLocSkkChange = (value) => {
    setLocSkks(value)
    console.log('locSkks', locSkks)
    console.log(courtData)
  }
  // 군구 useState 셋팅후, 그 값으로 코트장 정보 get, setCourtData
  useEffect(() => {
    axios
      .get(
        '/courts',
        {
          params: {
            locSd: locSds,
            locSkk: locSkks,
          },
        },
        []
      )
      .then(function (response) {
        // handleSetCourtData(response.data.content)
        setCourtData(response.data.content)
        console.log('setCourtData한 직후', courtData) //*** 빈배열
      })
      .catch((error) => {
        console.log(error)
      })
  }, [locSkks])

  const handleCourtChange = (courtno) => {
    setCourts(courtno)
    console.log('setcourts1', courts)
  }
  useEffect(() => {
    // setGames(courts)
    setCourts(courts)
    console.log('setcourts2', courts)
  }, [courts])

  useEffect(() => {
    // setCourtData(courtData)
    console.log('courtData값변경시-useeffect courtData', courtData)
    // setCourtData(courtData)
  }, [courtData])

  const onFinish = (values) => {
    console.log('검색')
    console.log(values)
    axios
      .get(
        '/games',
        {
          params: {
            courtNo: values.courtNo,
            genderType: values.genderType,
            historyType: values.historyType,
            ageType: values.ageType,
            locSd: values.locSd,
            locSkk: values.locSkk,
          },
        },
        []
      )
      .then(async (response) => {
        const res = await response.data.content
        console.log(res)
        if (res) {
          console.log('gamesres', res)
        } else if (!res) {
          alert('검색결과가 없습니다')
        }
        //ListPage의 setGames(games) ??):
        // setGames(games)
      })
      .catch((error) => {
        console.log(error)
        alert('검색결과가 없습니다')
      })
  }

  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name="locSd"
          rules={[{ required: true, message: '시/도를 선택해주세요' }]}
        >
          <Select
            defaultValue="시/도"
            style={{ width: 200 }}
            onChange={handleLocSdChange}
          >
            {locSdData.map((locSd) => (
              <Option key={locSd.value} value={locSd.value}>
                {locSd.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="locSkk"
          rules={[{ required: true, message: '군/구를 선택해주세요' }]}
        >
          <Select
            style={{ width: 200 }}
            defaultValue="군/구"
            onChange={handleLocSkkChange}
          >
            {locSkkData[locSds].map((locSkk) => (
              <Option key={locSkk.value} value={locSkk.value}>
                {locSkk.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* 사용자가 선택한 지역에 해당하는 코트장 이름 */}
        <Form.Item
          name="courtNo"
          rules={[{ required: true, message: '테니스장을 선택해주세요' }]}
        >
          <Select
            style={{ width: 200 }}
            defaultValue="테니스장"
            onChange={handleCourtChange}
          >
            {courtData &&
              courtData.map((court) => (
                <Option key={court.courtNo} courtno={court.courtNo}>
                  {court.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <UserInfo>
          <Form.Item name="genderType">
            <Select
              defaultValue="성별"
              style={{ width: 200 }}
              onChange={handleChange}
            >
              <Option value="여성">여성</Option>
              <Option value="남성">남성</Option>
              <Option value="">무관</Option>
            </Select>
          </Form.Item>

          <Form.Item name="historyType">
            <Select
              defaultValue="경력"
              style={{ width: 200 }}
              onChange={handleChange}
            >
              <Option value="">무관</Option>
              <Option value="1">6개월미만</Option>
              <Option value="2">6개월이상~1년미만</Option>
              <Option value="3">1년이상~5년이하</Option>
              <Option value="4">5년이상</Option>
            </Select>
          </Form.Item>

          <Form.Item name="ageType">
            <Select
              defaultValue="나이"
              style={{ width: 200 }}
              onChange={handleChange}
            >
              <Option value="">무관</Option>
              <Option value="1">10대</Option>
              <Option value="2">20대</Option>
              <Option value="3">30대</Option>
              <Option value="4">40대</Option>
              <Option value="5">50대</Option>
              <Option value="6">60대</Option>
            </Select>
          </Form.Item>
        </UserInfo>

        <ButtonDiv>
          <Button width={'200px'}>검색</Button>
        </ButtonDiv>
      </Form>
    </>
  )
}

export default Search
