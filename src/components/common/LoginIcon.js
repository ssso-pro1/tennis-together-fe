import styled, { css } from 'styled-components'
import DefaultImg from './assets/images/img-login-square-icon.png'

const LoginIcon = styled.div`
  display: flex;
  align-items: center;
  background-image: url('${DefaultImg}');

  /* font-size: ${(props) => props.fs || '16px'}; */
  .loginImg {
    display: block;
    /* overflow: hidden; */
    background-image: url('${DefaultImg}');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 50%;
    height: ${(props) => props.height || '150px'};
    width: ${(props) => props.width || '150px'};
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
export default LoginIcon
