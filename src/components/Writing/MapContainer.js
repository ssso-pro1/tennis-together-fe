import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SerchPlace } from './SerchPlace'

const { kakao } = window

const MapContainer = ({ searchPlace }) => {
  console.log('지도', searchPlace)
  // // 코트장 정보 세팅
  // const [positions, setpositions] = useState([])

  // kakao map 불러오기
  useEffect(() => {
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)

    // 장소검색 개체 설정
    const ps = new kakao.maps.services.Places()

    // 키워드로 장소검색
    ps.keywordSearch(searchPlace, placesSearchCB)

    // 키워드 검색 완료시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBiunds 객체에 좌표를 추가
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds)
      }
    }

    // 지도에 마커를 표시하는 함수
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시
      let marker = new kakao.maps.Marker({
        map: map,
        posotion: new kakao.maps.LatLng(place.y, place.x),
      })
    }
  }, [searchPlace])

  // // 코트정보 불러오기
  // useEffect(() => {
  //   axios(`http://localhost:3000/courts`) //
  //     .then((response) => {
  //       console.log(response)
  //       setpositions(response.data)
  //     })
  // }, [])

  return (
    <div>
      <div
        id="myMap"
        style={{
          width: '100%',
          height: '500px',
        }}
      ></div>
      <div>{/* <p>{positions[0].name}</p> */}</div>
    </div>
  )
}

export default MapContainer
