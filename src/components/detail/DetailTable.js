import styled from 'styled-components'
import Map from 'components/detail/Map'
import { historyType } from 'components/common/constants'

const DetailTable = ({ game }) => {
  const dates = game.strDt.split('T')
  const endDates = game.endDt.split('T')
  const history = game.historyType

  return (
    <div>
      <TableStyle key={game.gameNo}>
        <table class="info-table">
          <tbody>
            <tr>
              <th scope="row">모집날짜</th>
              <td>
                {dates[0] === endDates[0]
                  ? dates[0]
                  : dates[0] + ' ~ ' + endDates[0]}
              </td>
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
                <Map game={game} />
              </td>
            </tr>
            <tr>
              <th scope="row">전화번호</th>
              <td>
                <a href="tel:{game.court.courtContact}">
                  {game.court.courtContact}
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">이용시간</th>
              <td>{game.court.operateTime}</td>
            </tr>
            <tr>
              <th scope="row">사이트</th>
              <td>
                <a href={game.court.orgUrl} target="_blank" rel="noreferrer">
                  {game.court.orgUrl}
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">요금</th>
              <td>{game.court.price}</td>
            </tr>
            <tr>
              <th scope="row">성별</th>
              <td>{game.genderType === ' ' ? '무관' : game.genderType}</td>
            </tr>
            <tr>
              <th scope="row">경력</th>
              <td>{historyType[history]}</td>
            </tr>
            <tr>
              <th scope="row">연령대</th>
              <td>{game.ageType === 0 ? '무관' : game.ageType대}</td>
            </tr>
          </tbody>
        </table>
        <p className="content">{game.content}</p>
      </TableStyle>
    </div>
  )
}
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
      font-size: 14px;
      padding: 12px;
    }

    th {
      width: 160px;
      font-weight: 400;
      color: #9999;
      vertical-align: inherit;
      padding-left: 0;
    }

    td {
      padding-left: 0;
      a {
        color: #000000d9;
        font-weight: 400;
        &:hover {
          color: #000;
        }
      }
    }
  }

  .content {
    font-size: 14px;
    padding: 50px 0 80px 0;
  }
`
export default DetailTable
