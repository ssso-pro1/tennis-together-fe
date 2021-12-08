import React, { useState, useEffect, memo, useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../../service/authState'
import axios from 'axios'
import baseApi from '../../service/baseApi'

import Banner from './Banner'
import Search from './Search'
import GameCard from './GameCard'
import RecomList from 'components/Friends/RecomList'

import styled from 'styled-components'
import { Pagination, Affix, Grid, Tag } from 'antd'
import Loading from 'styled-components/Loading'

// const ListPage = memo(() => {
const ListPage = () => {
  const { user } = useContext(UserContext)
  const history = useHistory()

  const [games, setGames] = useState(null)
  const [loading, setLoading] = useState(true)
  const [recommends, setRecommends] = useState(null)
  const [loadingFri, setLoadingFri] = useState(true)
  const uid = user && user.uid
  // const [locSds, setLocSds] = React.useState(locSdData[0].value)
  // const [locSkks, setLocSkks] = React.useState(locSkkData[locSds][0].value)
  const [locSds, setLocSds] = React.useState(null)
  const [locSkks, setLocSkks] = React.useState(null)
  const [courtData, setCourtData] = React.useState([])
  const [courts, setCourts] = React.useState([courtData][0].courtNo)
  const [genderType, setGenderType] = React.useState([])
  const [historyType, setHistoryType] = React.useState([])
  const [ageType, setAgeType] = React.useState([])

  const [totalPage, setTotalPage] = useState(0)
  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const [current, setCurrent] = useState(0)

  const pageSize = 6

  // 게임리스트 불러오기
  useEffect(() => {
    setLoading(true)
    axios
      .get('/games') //
      .then((response) => {
        // console.log(response.data.content)
        setLoading(false)
        setGames(response.data.content)
        setTotalPage(response.data.content.length / pageSize)
        setMinIndex(0)
        setMaxIndex(pageSize)
      })
  }, [])

  const onGameClick = (game) => {
    history.push(`/pages/detail/${game.gameNo}`)
  }

  //==================================================

  // 시도 군구에 따른 코드장 이름들 불러도기
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

  // 검색하기
  const handleSearch = (values) => {
    // form.resetFields()
    setGames(null)
    setLoading(true)

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
          setTotalPage(res.length / pageSize)
          setMinIndex(0)
          setMaxIndex(pageSize)
          setLoading(false)
          setGames(res)
        } else if (!res) {
          alert('검색결과가 없습니다')
        }
      })
      .catch((error) => {
        console.log(error)
        alert('검색결과가 없습니다')
        setLoading(false)
        setGames(null)
      })
  }

  useEffect(() => {
    setLoading(false)
  }, [games])

  // ======================================================
  // 친구추천리스트

  useEffect(() => {
    console.log('추천친구리스트')
    baseApi
      .get(
        '/users/me/friends/recommend',
        {
          uid: uid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(async (response) => {
        const res = await response.data.content
        console.log('recommend', res)
        setLoadingFri(false)
        setRecommends(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleChange = (page) => {
    setCurrent(page)
    setMinIndex((page - 1) * pageSize)
    setMaxIndex(page * pageSize)
  }
  //==================================================
  const ScreenWrap = styled.div`
    @media screen and (max-width: 376px) {
      // 친구추천 float banner-> 위에 붙어서 스크롤 내려도 따라오지 않게 !
      // 아래에 searchDiv(width길게), gamesDiv
      flex-direction: column;
      .recommendDiv {
      }
      .ant-affix {
        position: static;
      }
      .searchDiv,
      .gamesDiv {
        flex: 1 100%;
      }
    }
    position: relative;
    width: 100vw;
    .page {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
    }
  `
  const Section = styled.div`
    max-width: 1200px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media screen and (max-width: 1200px) {
      .searchDiv {
        width: 100%;
        margin-left: 10%;
      }
      .gamesDiv {
        margin-left: 10%;
        margin-top: 20%;
        .resultDiv {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 20em;
        }
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
      /* display: flex;
      flex-direction: row; */
      flex: 1 77%;
      .spin {
        color: #78ca1e;
      }
      .listDiv {
        display: flex;
      }
      .gamesList {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  `

  const FloatBanner = styled.div`
    position: absolute;
    top: 0;
    right: 20px;
  `

  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  return (
    <>
      <Banner />

      <ScreenWrap>
        <FloatBanner className="recommendDiv">
          {/* <Affix offsetTop={120} onChange={(affixed) => console.log(affixed)}> */}
          <Affix offsetTop={120}>
            <RecomList recommends={recommends} loadingFri={loadingFri} />
          </Affix>
        </FloatBanner>
        <Section>
          <div className="searchDiv">
            <h3 id="searchA" className="title">
              검색하기
            </h3>
            <Search
              // locSdData={locSdData}
              // locSkkData={locSkkData}
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
            {loading ? (
              <Loading />
            ) : (
              <ul className="gamesList">
                {games ? (
                  games.map((game) => (
                    <GameCard //
                      key={game.gameNo}
                      game={game}
                      onGameClick={onGameClick}
                    />
                  ))
                ) : (
                  <div className="resultDiv">
                    <h1>
                      검색결과가 없습니다{' '}
                      <img
                        src="/images/img-tennis-ball.png"
                        alt="ball"
                        width="20em"
                      />{' '}
                    </h1>
                  </div>
                )}
              </ul>
            )}
          </div>
        </Section>
        <div className="page">
          {games && (
            <Pagination
              pageSize={pageSize}
              current={1}
              total={games.length}
              onChange={handleChange}
            />
          )}
        </div>
      </ScreenWrap>
    </>
  )
}

export default ListPage
