import React, { useEffect } from 'react'
import ball from 'components/common/images/markImg.png'

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

    var imageSrc = ball,
      imageSize = new kakao.maps.Size(38, 55),
      imageOption = { offset: new kakao.maps.Point(30, 50) }

    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    )

    var markerPosition = new kakao.maps.LatLng(game.court.lat, game.court.lon)

    // 마커를 생성
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
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
