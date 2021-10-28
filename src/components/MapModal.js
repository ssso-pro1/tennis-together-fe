import React from 'react';

function MapModal() {
  return (
    <div>
      <div className="map-modal overlay">
        <div className="map-modal-content">
          <div className="input-group">
            <i class="ic-search" aria-hidden></i>
            <input
              class="form-input"
              type="text"
              placeholder="지번,도로명으로 검색"
            />
          </div>
          <div className="map-address">
            <p>서울시 마포구 합정동 173-8</p>
            <span>
              <strong className="tag-gray">도로명</strong> 서울시 마포구
              합정터널로 200-1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapModal;
