import styled, { css } from 'styled-components'

const Flexbox = styled.div`
  display: flex;
  align-items: ${(props) => props.ai || 'center'};
  justify-content: ${(props) => props.jc || 'center'};

  ${(props) =>
    props.InlineFlexbox &&
    css`
      display: inline-flex;
      align-items: ${(props) => props.ai || 'center'};
      justify-content: ${(props) => props.jc || 'center'};
    `}

  ${(props) =>
    props.ColomnFlexbox &&
    css`
      flex-direction: column;
    `}
`

export default Flexbox
