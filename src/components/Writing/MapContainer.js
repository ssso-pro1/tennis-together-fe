import React, { useEffect } from 'react'

const { kakao } = window

const MapContainer = ({
  courts,
  searchPlace,
  setCourtInfo,
  onAddressChange,
}) => {
  console.log('지도:', searchPlace)

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

        displayMarker()

        for (let i = 0; i < data.length; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds)
      }
    }

    // 지도에 마커를 표시하는 함수
    function displayMarker() {
      courts.content.map((court) => {
        var markerPosition = new kakao.maps.LatLng(court.lat, court.lon)
        var marker = new kakao.maps.Marker({ map, position: markerPosition })

        // 마커 클릭 이벤트
        kakao.maps.event.addListener(marker, 'click', function () {
          setCourtInfo(court)
          onAddressChange(court)
          console.log('지도쓰', court)
        })
      })
    }
  }, [searchPlace])

  return (
    <div>
      <div id="myMap" style={{ width: '100%', height: '500px' }}></div>
    </div>
  )
}

export default MapContainer
