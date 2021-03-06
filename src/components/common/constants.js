import BallDefault from 'components/common/BallDefault'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import Flexbox from 'components/common/Flexbox'

export const BREAKPOINT_PC = 'pc'
export const BREAKPOINT_TABLET = 'tablet'
export const BREAKPOINT_PHONE_MEDIUM = 'phoneMedium'
export const BREAKPOINT_PHONE_SMALL = 'phoneSmall'

export const breakpoints = {
  pc: 1279,
  tablet: 767,
  phoneMedium: 414,
  phoneSmall: 325,
}

export const mediaQueries = (key: typeof breakpoints) => {
  return `@media screen and (max-width: ${breakpoints[key]}px)`
}

export const status = {
  RECRUITING: '모집',
  CLOSED: '마감',
  DELETED: '완료',
}

export const age = {
  0: '무관',
  10: '10대',
  20: '20대',
  30: '30대',
  40: '40대',
  50: '50대',
  60: '60대',
}

export const historyType = {
  '': '무관',
  1: '6개월 미만',
  2: '6개월이상 ~ 1년 미만',
  3: '1년 이상 ~ 5년 미만',
  4: '5년 이상',
}

export const historyT = {
  1: '6개월 미만',
  2: '6개월이상 ~ 1년 미만',
  3: '1년 이상 ~ 5년 미만',
  4: '5년 이상',
}

export const customIcons = {
  1: <BallDefault />,
  2: <BallDefault />,
  3: <BallDefault />,
  4: <BallDefault />,
  5: <BallDefault />,
}
export const antIcon = (
  <LoadingOutlined style={{ fontSize: 32, color: '#11992f' }} spin />
)
export const LoadingSpin = () => {
  return (
    <Flexbox style={{ height: '100vh' }}>
      <Spin indicator={antIcon} />
    </Flexbox>
  )
}

export const locSdData = [
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

export const locSkkData = {
  1: [
    { label: '종로구', name: '종로구', value: 1 },
    { label: '중구', name: '중구', value: 2 },
    { label: '용산구', name: '용산구', value: 3 },
    { label: '성동구', name: '성동구', value: 4 },
    { label: '광진구', name: '광진구', value: 5 },
    { label: '동대문구', name: '동대문구', value: 6 },
    { label: '중랑구', name: '중랑구', value: 7 },
    { label: '성북구', name: '성북구', value: 8 },
    { label: '강북구', name: '강북구', value: 9 },
    { label: '도봉구', name: '도봉구', value: 10 },
    { label: '노원구', name: '노원구', value: 11 },
    { label: '은평구', name: '은평구', value: 12 },
    { label: '서대문구', name: '서대문구', value: 13 },
    { label: '마포구', name: '마포구', value: 14 },
    { label: '양천구', name: '양천구', value: 15 },
    { label: '강서구', name: '강서구', value: 16 },
    { label: '구로구', name: '구로구', value: 17 },
    { label: '금천구', name: '금천구', value: 18 },
    { label: '영등포구', name: '영등포구', value: 19 },
    { label: '동작구', name: '동작구', value: 20 },
    { label: '관악구', name: '관악구', value: 21 },
    { label: '서초구', name: '서초구', value: 22 },
    { label: '강남구', name: '강남구', value: 23 },
    { label: '송파구', name: '송파구', value: 24 },
    { label: '강동구', name: '강동구', value: 25 },
  ],
  2: [
    { label: '수원시', name: '수원시', value: 1 },
    { label: '성남시', name: '성남시', value: 2 },
    { label: '고양시', name: '고양시', value: 3 },
    { label: '용인시', name: '용인시', value: 4 },
    { label: '부천시', name: '부천시', value: 5 },
    { label: '안산시', name: '안산시', value: 6 },
    { label: '안양시', name: '안양시', value: 7 },
    { label: '남양주시', name: '남양주시', value: 8 },
    { label: '화성시', name: '화성시', value: 9 },
    { label: '평택시', name: '평택시', value: 10 },
    { label: '의정부시', name: '의정부시', value: 11 },
    { label: '시흥시', name: '시흥시', value: 12 },
    { label: '파주시', name: '파주시', value: 13 },
    { label: '광명시', name: '광명시', value: 14 },
    { label: '김포시', name: '김포시', value: 15 },
    { label: '군포시', name: '군포시', value: 16 },
    { label: '광주시', name: '광주시', value: 17 },
    { label: '이천시', name: '이천시', value: 18 },
    { label: '양주시', name: '양주시', value: 19 },
    { label: '오산시', name: '오산시', value: 20 },
    { label: '구리시', name: '구리시', value: 21 },
    { label: '안성시', name: '안성시', value: 22 },
    { label: '포천시', name: '포천시', value: 23 },
    { label: '의왕시', name: '의왕시', value: 24 },
    { label: '하남시', name: '하남시', value: 25 },
    { label: '여주시', name: '여주시', value: 26 },
    { label: '양평군', name: '양평군', value: 27 },
    { label: '동두천시', name: '동두천시', value: 28 },
    { label: '과천시', name: '과천시', value: 29 },
    { label: '가평군', name: '가평군', value: 30 },
    { label: '연천군', name: '연천군', value: 31 },
  ],
}
