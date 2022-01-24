import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../../service/authState'
import baseApi from '../../service/baseApi'

import Banner from './Banner'
import Searching from './Searching'
import GameCard from './GameCard'
import RecomList from 'components/listPage/RecomList'

import styled from 'styled-components'
import { Pagination, Affix, Grid, Tag, Spin } from 'antd'
import { antIcon } from 'components/common/constants'

const ListPage = () => {
  const { user } = useContext(UserContext)
  const history = useHistory()
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()

  const uid = user && user.uid
  const [games, setGames] = useState(null)
  const [loading, setLoading] = useState(true)
  const [recommends, setRecommends] = useState(null)
  const [loadingFri, setLoadingFri] = useState(true)
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

  const onGameClick = (game) => {
    history.push(`/pages/${game.gameNo}/detail`)
  }

  const handleLocSdChange = (value) => {
    setLocSds(value)
  }

  const handleLocSkkChange = (value) => {
    setLocSkks(value)
    // console.log('locSkks2', locSkks)
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

  // 검색하는 기능
  const handleSearch = async (values) => {
    setLoading(true)
    try {
      const response = await baseApi.get('/games', {
        params: {
          courtNo: values.courtNo,
          genderType: values.genderType,
          historyType: values.historyType,
          ageType: values.ageType,
          locSd: values.locSd,
          locSkk: values.locSkk,
        },
      })
      setGames(response.data.content)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setGames(null)
      setLoading(false)
      alert('해당 조건에 부합하는 게임이 없습니다😅')
    }
  }

  // 디폴트 게임리스트 불러오기
  useEffect(() => {
    gamesData()
  }, [])

  const gamesData = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get('/games')
      setGames(response.data.content)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  // 친구추천리스트
  useEffect(() => {
    friendsRecData()
  }, [setRecommends])

  const friendsRecData = async () => {
    setLoadingFri(true)
    try {
      const response = await baseApi.get('/users/me/friends/recommend', {
        uid: uid,
      })
      setRecommends(response.data.content)
      setLoadingFri(false)
    } catch (error) {
      console.log(error)
    }
  }

  // 해당하는 시도와 군구에 따른 코드장 목록 불러오기
  useEffect(() => {
    handleCourtData()
  }, [locSkks])

  const handleCourtData = async (values) => {
    try {
      const response = await baseApi.get('/courts', {
        params: {
          locSd: locSds,
          locSkk: locSkks,
        },
      })
      setCourtData(response.data.content)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (page) => {
    setCurrent(page)
    setMinIndex((page - 1) * pageSize)
    setMaxIndex(page * pageSize)
  }

  return (
    <>
      <Banner />

      <ScreenWrap>
        <FloatBanner className="recommendDiv">
          <Affix offsetTop={120}>
            <RecomList recommends={recommends} loadingFri={loadingFri} />
          </Affix>
        </FloatBanner>
        <Section>
          <div className="searchDiv">
            <h3 id="searchA" className="title">
              검색하기
            </h3>
            <Searching
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
              <Spin indicator={antIcon} style={{ marginLeft: '150px' }} />
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
                    <h1>해당 조건에 부합하는 게임이 없습니다😅</h1>
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

const ScreenWrap = styled.div`
  @media screen and (max-width: 376px) {
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
  }
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  padding-bottom: 10%;
  margin: auto;
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
