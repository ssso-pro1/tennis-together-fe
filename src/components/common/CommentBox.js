import styled, { css } from 'styled-components'

import Button from 'components/common/Buttons'

const CommentBox = styled.div`
  padding: 20px 0 16px;

  .content {
    padding-bottom: 20px;
  }

  .date {
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.005em;
    color: #8c8d96;
    margin-bottom: 5px;
  }

  ${(props) =>
    props.ReplyBox &&
    css`
      padding-top: 20px;
      padding-bottom: 16px;
      padding-right: 26px;
      padding-left: 40px;
      border-top: 1px solid ${(props) => props.theme.gray};
      border-bottom: 1px solid ${(props) => props.theme.gray};
    `}
  ${(props) =>
    props.TextBox &&
    css`
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: end;
      margin-bottom: 50px;
      padding-top: 20px;
      padding-bottom: 16px;
      padding-right: 26px;
      padding-left: 40px;
      border-top: 1px solid ${(props) => props.theme.gray};
      border-bottom: 1px solid ${(props) => props.theme.gray};
      background-color: ${(props) => props.bgc || 'rgba(0, 0, 0, 0.05)'};

      .CommentBox {
        border: 1px solid ${(props) => props.theme.gray};
        border-radius: 4px;
        display: block;
        width: 100%;
        height: 150px !important;
        padding: 15px 0 0 15px;

        .active {
          border: 1px solid black;
        }
        &::placeholder {
          font-size: 14px;
        }
      }
      ${Button} {
        margin-top: 10px;
      }
    `}
`

export default CommentBox