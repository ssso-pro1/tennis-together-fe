import React from 'react'
import Icon from '@ant-design/icons'
const BallDefault = () => {
  const BallGraySvg = () => (
    <svg width="1em" height="1em" viewBox="0 0 50 50" fill="none">
      <circle cx="25" cy="25" r="25" fill="currentColor" />
      <path
        d="M10.2273 5.27521C10.0455 5.27521 8.18182 6.65135 7.5 7.56879C19.0909 35.0917 42.9547 8.25691 42.5002 7.56884C42.1365 7.01838 40.682 5.81043 40.0002 5.27526C16.5911 31.1927 10.4545 5.27521 10.2273 5.27521Z"
        fill="white"
      />
      <path
        d="M12.2727 46.3303L9.09091 44.0367C22.9091 32.844 36.0606 39.3731 40.9091 44.0367C40 45.1376 37.9545 46.3303 37.0455 46.789C28.3182 37.4312 16.8939 42.5841 12.2727 46.3303Z"
        fill="white"
      />
      <path
        d="M10.2273 5.27521C10.0455 5.27521 8.18182 6.65135 7.5 7.56879C19.0909 35.0917 42.9547 8.25691 42.5002 7.56884C42.1365 7.01838 40.682 5.81043 40.0002 5.27526C16.5911 31.1927 10.4545 5.27521 10.2273 5.27521Z"
        stroke="white"
      />
      <path
        d="M12.2727 46.3303L9.09091 44.0367C22.9091 32.844 36.0606 39.3731 40.9091 44.0367C40 45.1376 37.9545 46.3303 37.0455 46.789C28.3182 37.4312 16.8939 42.5841 12.2727 46.3303Z"
        stroke="white"
      />
    </svg>
  )
  const BallDefault = (props) => <Icon component={BallGraySvg} {...props} />
  return (
    <div>
      <BallDefault style={{ fontSize: '20px' }} />
    </div>
  )
}
export default BallDefault
