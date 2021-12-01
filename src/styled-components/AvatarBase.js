import styled from 'styled-components'

const AvatarBase = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;

  .avatarImg {
    display: block;
    overflow: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 50%;
    width: ${(props) => props.width || '32px'};
    height: ${(props) => props.height || '32px'};
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .nickname {
    color: black;
    font-size: ${(props) => props || '14px'};
    line-height: 24px;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 10px;
    &:hover {
      text-decoration: underline;
    }
  }
  time {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.005em;
    color: #8c8d96;
    margin-left: 10px;
  }

  .info {
    display: block;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.005em;
    color: #8c8d96;
    margin-right: 10px;
    span:not(:last-child)::after {
      content: '|';
      margin: 0 5px;
    }
  }
`

export default AvatarBase
