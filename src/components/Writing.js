import React, { useState } from 'react'
import { Row, Col } from 'antd'
import Button from '../styled-components/Buttons'
import Flexbox from '../styled-components/Flexbox'

import Selects from './select'
import MapModal from './MapModal'

function Writing() {
  const [modal, setmodal] = useState(false)

  return (
    <div>
      <Row>
        <Col span={22} offset={1}>
          <div className="writing-content">
            <div className="writing-content-header">
              <Flexbox jc={'space-between'}>
                <textarea placeholder="제목을 입력하세요"></textarea>
                <Button height={'40px'}>발행하기</Button>
              </Flexbox>
            </div>
            <div
              className="input-group"
              onClick={() => {
                setmodal(!modal)
              }}
            >
              <i class="ic-search" aria-hidden></i>
              <input
                class="form-input"
                type="text"
                placeholder="주소를 입력하세요"
              />
            </div>
            <Selects />
            <div className="writing-textarea">
              <textarea placeholder="추가정보를 입력하세요"></textarea>
            </div>
            {modal === true ? <MapModal /> : null}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Writing
