import React from 'react'
import styled from 'styled-components'
import { ReactComponent as SixDots } from '../images/blocks/sixdots-action.svg'
import { ReactComponent as Plus } from '../images/blocks/plus-action.svg'
import { ReactComponent as ThreeDots } from '../images/blocks/threedots-action.svg'

const BlockAction = ({ type, color, onClick }) => {
  if (type === 'six-dots') {
    return (
      <Wrapper id="block-action" onClick={onClick}>
        <SixDots fill={color} width="14px" heigth="14px" />
      </Wrapper>
    )
  } else if (type === 'three-dots') {
    return (
      <Wrapper id="block-action" onClick={onClick}>
        <ThreeDots fill={color} width="14px" heigth="14px" />
      </Wrapper>
    )
  } else if (type === 'plus') {
    return (
      <Wrapper id="block-action" onClick={onClick}>
        <Plus fill={color} width="14px" heigth="14px" />
      </Wrapper>
    )
  }
}

export default BlockAction

const Wrapper = styled.div`
  width: 18px;
  height: 24px;

  fill: ${p =>
    p.color === 'clear-gray' ? 'var(--color-gray)' : 'var(--color-hover-75);'};

  visibility: hidden;
  display: flex;
  justify-content: center;

  cursor: pointer;

  :hover {
    background-color: var(--color-gray-25);
  }
`
