import React from 'react';
import { Select, DatePicker, Space } from 'antd';
const { Option } = Select;

const Selects = () => {
  return (
    <div className="detail-selects">
      <Select
        className="form-select"
        defaultValue="gender"
        style={{ width: 120 }}
        placeholder="성별"
      >
        <Option value="gender">성별</Option>
        <Option value="female">여성</Option>
        <Option value="male">남성</Option>
      </Select>
      <Select
        className="form-select"
        defaultValue="career"
        style={{ width: 120 }}
        placeholder="경력"
      >
        <Option value="career">경력</Option>
        <Option value="1">~1년</Option>
        <Option value="2">~2년</Option>
        <Option value="3">~3년</Option>
        <Option value="4">3년 이상</Option>
      </Select>

      <DatePicker />
    </div>
  );
};

export default Selects;
