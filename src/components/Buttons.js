import styled, { css } from 'styled-components'

const Button = styled.button`
  background: #11992f;
  color: white;
  border-radius: 4px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  height: 55px;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: #13802b;
  }

  ${(props) =>
    props.Outlined &&
    css`
      border: 1px solid #11992f;
      background-color: white;
      color: #11992f;
      &:hover {
        border: none;
        background-color: #11992f;
        color: white;
      }
    `}
`

export default Button
