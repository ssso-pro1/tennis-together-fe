import styled from 'styled-components'
import MapContainer from './MapContainer'

export default function DetailTable({ game }) {
  const TableStyle = styled.div`
    .info-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;

      tr {
        font-size: 12px;
        text-align: left;
        vertical-align: top;
      }

      th,
      td {
        padding: 12px;
      }

      th {
        width: 160px;
        font-weight: 400;
        color: #9999;
      }

      td {
        padding-left: 0;
      }
    }
  `
  return (
    <div>
      <TableStyle key={game.gameNo}>
        <table class="info-table">
          <tbody>
            <tr>
              <th></th>
              <td>{game.gameNo}</td>
            </tr>
            <tr>
              <th scope="row">모집날짜</th>
              <td>{game.strDt}</td>
            </tr>
            <tr>
              <th scope="row">장소</th>
              <td>{game.court.name}</td>
            </tr>
            <tr>
              <th scope="row">주소</th>
              <td>{game.court.roadAdr}</td>
            </tr>
            <tr>
              <th scope="row">위치정보</th>
              <td>
                <MapContainer />
              </td>
            </tr>
            <tr>
              <th scope="row">전화번호</th>
              <td>{game.court.courtContact}</td>
            </tr>
            <tr>
              <th scope="row">이용시간</th>
              <td>{game.court.operateTime}</td>
            </tr>
            <tr>
              <th scope="row">사이트</th>
              <td>{game.court.orgUrl}</td>
            </tr>
            <tr>
              <th scope="row">요금</th>
              <td>{game.court.price}</td>
            </tr>
            <tr>
              <th scope="row">성별</th>
              <td>{game.genderType}</td>
            </tr>
            <tr>
              <th scope="row">경력</th>
              <td>{game.historyType}</td>
            </tr>
            <tr>
              <th scope="row">연령대</th>
              <td>{game.ageType}</td>
            </tr>
          </tbody>
        </table>
        <p>{game.content}</p>
      </TableStyle>
    </div>
  )
}
