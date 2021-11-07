import { Row, Col } from 'antd'

import styled from 'styled-components'
import Button from 'styled-components/Buttons'
import Flexbox from 'styled-components/Flexbox'

import Selects from 'components/Writing/select'
import MapModal from 'components/Detail/MapModal'

function Writing() {
  const Write = styled.div`
    .absolute {
      padding-top: 2rem;
      position: absolute;
      width: 100%;
      .title {
        width: 90%;
        height: 66px;
        font-size: 48px;
        font-weight: bold;
        &::placeholder {
          color: rgb(134, 142, 150);
        }
        &:focus {
          outline: none;
        }
      }
      button {
        margin-top: 10px;
      }
    }

    textarea {
      padding-top: 250px;
      width: 100%;
      max-height: 100vh;
      resize: none;
    }
  `
  function newPost() {}

  return (
    <div>
      <Row>
        <Col span={22} offset={1}>
          <Write>
            <form action="">
              <div className="absolute">
                <Flexbox ai={'flex-start'} jc={'space-between'}>
                  <input
                    placeholder="제목을 입력하세요"
                    className="title"
                  ></input>
                  <Button fs={'16px'} onClick={newPost}>
                    발행하기
                  </Button>
                </Flexbox>
                <MapModal />
                <Selects />
              </div>
              <textarea placeholder="추가정보를 입력하세요"></textarea>
            </form>
          </Write>
        </Col>
      </Row>
    </div>
  )
}

export default Writing
