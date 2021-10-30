import styled, { css } from 'styled-components'

const AvatarBase = styled.a`
  display: block;
  overflow: hidden;
  background-image: url('./assets/images/img-user-default.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  width: ${(props) => props.size || '32px'};
  height: ${(props) => props.size || '32px'};
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default AvatarBase
