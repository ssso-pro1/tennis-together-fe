import React, { useState } from 'react'
import Selects from './select'
import MapModal from './MapModal'

function Writing() {
  const [modal, setmodal] = useState(false)

  return (
    <div className="writing-content">
      <div className="writing-content-header">
        <div className="writing-title">
          <textarea placeholder="제목을 입력하세요"></textarea>
        </div>
        <button type="button" className="btn-primary btn-40">
          발행하기
        </button>
      </div>
      <div
        className="input-group"
        onClick={() => {
          setmodal(!modal)
        }}
      >
        <i class="ic-search" aria-hidden></i>
        <input class="form-input" type="text" placeholder="주소를 입력하세요" />
      </div>

      <Selects />
      <div className="writing-textarea">
        <textarea placeholder="추가정보를 입력하세요"></textarea>
      </div>
      {modal === true ? <MapModal /> : null}
    </div>
  )
}

export default Writing
