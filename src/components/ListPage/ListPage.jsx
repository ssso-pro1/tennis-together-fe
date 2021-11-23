import React, { useState, useEffect, memo, useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../../service/authState'
import axios from 'axios'

import Navbar from '../Common/Navbar'
import Footer from './Footer'
import Header from './Header'
import Search from '../Search'
import ItemPage from './ItemPage'
// import RecomList from 'components/Friends/RecomList'
// import AddFriend from 'components/Friends/AddFriend'

import styled, { css } from 'styled-components'
import { Pagination, Form } from 'antd'

const ListPage = memo(({ props }) => {
  const { user } = useContext(UserContext)
  const [form] = Form.useForm()

  useEffect(() => {
    console.log(user)
  })
  const pageSize = 12

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
  const history = useHistory()
  const [games, setGames] = useState(null)

  // const [locSds, setLocSds] = React.useState(locSdData[0].value)
  // const [locSkks, setLocSkks] = React.useState(locSkkData[locSds][0].value)

  const [locSds, setLocSds] = React.useState(null)
  const [locSkks, setLocSkks] = React.useState(null)

  const [courtData, setCourtData] = React.useState([])
  const [courts, setCourts] = React.useState([courtData][0].courtNo)

  const [genderType, setGenderType] = React.useState([])
  const [historyType, setHistoryType] = React.useState([])
  const [ageType, setAgeType] = React.useState([])

  useEffect(() => {
    axios
      .get('/games') //
      .then((response) => {
        console.log(response.data.content)
        setGames(response.data.content)
      }, [])
  }, [])

  const onGameClick = (game) => {
    history.push(`/pages/detail/${game.gameNo}`)
  }

  //==================================================

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
        setCourtData(response.data.content)
      }, [])
      .catch((error) => {
        console.log(error)
      })
  }, [locSkks])

  useEffect(() => {
    setCourtData(courtData)
  }, [courtData])

  //--------------------------------------------------------------
  const handleLocSdChange = (value) => {
    setLocSds(value)
    // console.log('locSds1', locSds) // 1. X: 값 바뀌기전
  }

  const handleLocSkkChange = (value) => {
    setLocSkks(value)
    // console.log('locSkks2', locSkks) // 2. X: 값 바뀌기전
  }
  const handleCourtChange = (courtno) => {
    setCourts(courtno)
    // console.log('setcourts1', courts)
  }

  const handleGenderChange = (value) => {
    setGenderType(value)
  }

  const handleHistoryChange = (value) => {
    setHistoryType(value)
  }

  const handleAgeChange = (value) => {
    setAgeType(value)
  }

  // ======================================================

  const handleSearch = (values) => {
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
        form.resetFields()
        if (res) {
          console.log('gamesres', res)
        } else if (!res) {
          alert('검색결과가 없습니다')
        }
        setGames(res)
      })
      .catch((error) => {
        console.log(error)
        alert('검색결과가 없습니다')
      })
  }
  //==================================================

  const Section = styled.div`
    max-width: 1200px;
    display: flex;
    justify-content: center;
    /* @media screen and (max-width: 768px) { */
    @media screen and (max-width: 1200px) {
      .searchDiv {
        width: 100%;
        margin-left: 10%;
      }
      .gamesDiv {
        margin-left: 10%;
        margin-top: 20%;
      }
      .gamesList {
        /* flex-direction: column; */
        /* margin-left: 10%; */
      }
    }
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    padding-bottom: 10%;
    margin: auto;
    /* width: 85vw; */
    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 2rem;
    }
    .searchDiv {
      flex: 1 23%;
    }
    .gamesDiv {
      flex: 1 77%;
      .gamesList {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
    .page {
      margin-top: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `

  return (
    <>
      <Navbar />
      <Header />
      <Section>
        <div className="searchDiv">
          <h3 id="searchA" className="title">
            검색하기
          </h3>
          <Search
            locSdData={locSdData}
            locSkkData={locSkkData}
            locSds={locSds}
            locSkks={locSkks}
            courtData={courtData}
            courts={courts}
            handleLocSdChange={handleLocSdChange}
            handleLocSkkChange={handleLocSkkChange}
            handleCourtChange={handleCourtChange}
            onFinish={handleSearch}
            handleGenderChange={handleGenderChange}
            handleHistoryChange={handleHistoryChange}
            handleAgeChange={handleAgeChange}
            genderType={genderType}
            historyType={historyType}
            ageType={ageType}
          />
        </div>
        <div className="gamesDiv">
          <h3 className="title">현재 가능한 경기</h3>
          <ul className="gamesList">
            {games &&
              games.map((game) => (
                <ItemPage //
                  key={game.gameNo}
                  game={game}
                  onGameClick={onGameClick}
                />
              ))}
          </ul>
        </div>
        <div className="page">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </Section>
      {/* {user && <RecomList />} */}
      <Footer />
    </>
  )
})

export default React.memo(ListPage)
