import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  src: url("./assets/fonts/NotoSansKR-Regular.woff2") format('woff2'),
  url("./assets/fonts/NotoSansKR-Regular.woff") format('woff'),
  url("./assets/fonts/NotoSansKR-Regular.otf") format('truetype')
}


@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  src: url("./assets/fonts/NotoSansKR-Medium.woff2") format('woff2'),
  url("./assets/fonts/NotoSansKR-Medium.woff") format('woff'),
  url("./assets/fonts/NotoSansKR-Medium.otf") format('truetype')
}

@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  src: url("./assets/fonts/NotoSansKR-Bold.woff2") format('woff2'),
  url("./assets/fonts/NotoSansKR-Bold.woff") format('woff'),
  url("./assets/fonts/NotoSansKR-Bold.otf") format('truetype')
}
`
