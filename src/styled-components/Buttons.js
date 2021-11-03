import styled, { css } from 'styled-components'

const Button = styled.button`
  background: ${(props) => props.theme.green};
  color: white;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  font-size: ${(props) => props.fs || '16px'};
  font-weight: bold;
  height: ${(props) => props.height || '40px'};
  width: ${(props) => props.width || '100px'};
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.greenDark};
  }

  ${(props) =>
    props.Outlined &&
    css`
      border: 1px solid ${(props) => props.theme.green};
      background-color: white;
      color: ${(props) => props.theme.green};
      &:hover {
        border: none;
        background-color: ${(props) => props.theme.green};
        color: white;
      }
    `}
  ${(props) =>
    props.Secondary &&
    css`
      border: 1px solid ${(props) => props.theme.gray};
      background-color: white;
      color: ${(props) => props.theme.gray};
      margin-right: 5px;
      &:hover {
        border: none;
        background-color: ${(props) => props.theme.gray};
        color: white;
      }
    `}
`

export default Button
