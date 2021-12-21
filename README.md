# 🎾 Tennis Together (테니스 투게더)

<img src="https://user-images.githubusercontent.com/77109766/146639243-a4841316-5a04-49bc-b126-6bf346b7aa0d.png" />
<br />

## 📌 서비스 설명 

> 서울, 경기 지역의 테니스를 하는 유저들에게 다양한 조건들로 모임을 생성하고 참여할 수 있도록 매칭해주는 서비스입니다. 

> 사용자는 핸드폰 번호로 로그인 및 회원가입을 할 수 있습니다. 
원하는 조건을 설정하여 모임을 생성하고 참여자들을 모을 수 있습니다. 또한 이미 생성된 모임을 위치, 테니스장 이름, 성별, 나이, 경력 등의 필터링 기능을 통해 조회할 수 있으며, 원하는 게임에 참여 신청을 할 수 있습니다. <br />
참여자가 게임에 참여신청을 하면 알림 페이지에 신청글 알림이 뜹니다. 게임 등록자는 게임 신청자를 수락하거나 거절할 수 있습니다. 수락을 할 경우 히스토리 페이지에 내용이 추가됩니다. <br />
알림 페이지에서 신청한 유저의 아바타를 클릭 시 팝업 프로필이 뜨며, 해당 유저의 프로필과 다른 유저들이 해당 유저에 대해 남긴 리뷰 리스트를 확인할 수 있습니다. 이 프로필에서 친구추가 버튼을 클릭 시 친구가 추가되며, 친구 목록 페이지에서 친구목록을 확인할 수 있습니다.
<br />

## 💻 실행 방법
```
npm start
```
<br />

## 💡 주요 기능
- 자동 로그인 및 로그아웃 기능 
  - Firebase Phone number Oauth
  - Firebase Token 
  - Local Storage
- 회원가입 기능 
- 프로필 이미지 업로드 기능 및 프로필 수정 기능
- 게임 목록 조회 기능
- 글쓰기 CRUD 기능
  - 테니스장 위치 등록 : Kakao map API
- 댓글 CRUD 기능
- 마이 페이지
  - 알림 페이지 
    - 유저 프로필 팝업 : 친구 추가 기능
  - 히스토리 페이지
  - 친구 목록 페이지 
<br />

## 🛠 기술 스택
<b>Front-End</b>
- JavaScript
- React Hooks
- Styled-components
- Ant-design

<b>Back-End</b>
- Spring boot 
- Java 11 
- Heroku

<b>ETC</b>
- IDE : Visual Studio Code
- Modeling Tool : Figma
- 형상 관리 : GitHub
<br />

## 📑 FE 역할 분담
- 송다영 : 글쓰기페이지(글과 댓글 CRUD), 알림페이지, 히스토리페이지
- 장소연 : 메인페이지, 네비게이션바, 로그인 및 회원가입페이지, 프로필수정페이지, 친구목록페이지, 알림페이지-팝업프로필
<br />

## 🖋 기획 & 설계
- [figma 페이지 기획 및 디자인]
- [초기 기능 명세서](https://www.notion.so/0c893d3b2bb048b3b50922a350545b59)
- [API 문서](https://www.notion.so/API-b392106bc51746e3b9aad7d152fb327b)
<br />

## 백엔드 깃허브 url
Back-end Github Url : https://github.com/setung/tennis_together <br />
Tennis Crawler Github Url : https://github.com/setung/tennis_together_crawler



