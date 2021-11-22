import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../styled-components/Buttons'
import { Select, Form } from 'antd'

const { Option } = Select

const ButtonDiv = styled.div`
  margin-top: 10px;
`

const Search = memo(
  ({
    locSdData,
    locSkkData,
    locSds,
    locSkks,
    courtData,
    handleLocSdChange,
    handleLocSkkChange,
    handleCourtChange,
    onFinish,
    handleGenderChange,
    handleHistoryChange,
    handleAgeChange,
    courts,
    genderType,
    historyType,
    ageType,
  }) => {
    const [form] = Form.useForm()

    /*
    useEffect(() => {
      console.log('search- locSds', locSds)
    }, [locSds]) // * 1. 출력, 전달, 리렌더링문제(1번 서울선택하면 ㄱㅊ, 2번 경기도 선택하면 리렌더링)

    useEffect(() => {
      console.log('search- locSkks', locSkks) // * 2. 출력, 전달
    }, [locSkks])

    useEffect(() => {
      console.log('search- courtData', courtData)
    }, [courtData]) // * 3. 출력, 전달

    useEffect(() => {
      console.log('search- courts', courts)
    }, [courts])

    useEffect(() => {
      console.log('search- gender', genderType)
    }, [genderType])

    useEffect(() => {
      console.log('search- history', historyType)
    }, [historyType])

    useEffect(() => {
      console.log('search- age', ageType)
    }, [ageType])
    */

    return (
      <>
        <Form className="searchForm" onFinish={onFinish} form={form}>
          <Form.Item
            initialValue={locSds}
            name="locSd"
            rules={[{ required: true, message: '시/도를 선택해주세요' }]}
          >
            <Select
              placeholder={<span>시/도</span>}
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
            initialValue={locSkks}
            name="locSkk"
            rules={[{ required: true, message: '군/구를 선택해주세요' }]}
          >
            <Select
              placeholder={<span>군/구</span>}
              style={{ width: 200 }}
              onChange={handleLocSkkChange}
            >
              {locSds &&
                locSkkData[locSds].map((locSkk) => (
                  <Option key={locSkk.value} value={locSkk.value}>
                    {locSkk.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            initialValue={courts}
            name="courtNo"
            rules={[{ required: true, message: '테니스장을 선택해주세요' }]}
          >
            <Select
              placeholder={<span>테니스장</span>}
              style={{ width: 200 }}
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
          <br />
          <Form.Item name="genderType" initialValue={genderType}>
            <Select
              placeholder={<span>성별</span>}
              style={{ width: 200 }}
              onChange={handleGenderChange}
            >
              <Option value=" ">무관</Option>
              <Option value="여성">여성</Option>
              <Option value="남성">남성</Option>
            </Select>
          </Form.Item>

          <Form.Item initialValue={historyType} name="historyType">
            <Select
              placeholder={<span>경력</span>}
              style={{ width: 200 }}
              onChange={handleHistoryChange}
            >
              <Option value=" ">무관</Option>
              <Option value="1">6개월미만</Option>
              <Option value="2">6개월이상~1년미만</Option>
              <Option value="3">1년이상~5년이하</Option>
              <Option value="4">5년이상</Option>
            </Select>
          </Form.Item>

          <Form.Item initialValue={ageType} name="ageType">
            <Select
              placeholder={<span>나이</span>}
              style={{ width: 200 }}
              onChange={handleAgeChange}
            >
              <Option value=" ">무관</Option>
              <Option value="1">10대</Option>
              <Option value="2">20대</Option>
              <Option value="3">30대</Option>
              <Option value="4">40대</Option>
              <Option value="5">50대</Option>
              <Option value="6">60대</Option>
            </Select>
          </Form.Item>

          <ButtonDiv>
            <Button width={'200px'}>검색</Button>
          </ButtonDiv>
        </Form>
      </>
    )
  }
)

export default React.memo(Search)
