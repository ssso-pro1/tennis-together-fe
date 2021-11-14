import React, { useEffect } from 'react'

const { kakao } = window

const Map = ({ game }) => {
  // kakao map 불러오기
  useEffect(() => {
    const container = document.getElementById('map')
    const options = {
      center: new kakao.maps.LatLng(game.court.lat, game.court.lon),
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)

    //마커가 표시 될 위치
    var markerPosition = new kakao.maps.LatLng(game.court.lat, game.court.lon)

    // 마커를 생성
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    })

    // 마커를 지도 위에 표시
    marker.setMap(map)
  }, [])

  return (
    <div>
      <div
        id="map"
        style={{
          width: '100%',
          height: '500px',
        }}
      ></div>
    </div>
  )
}

export default Map
