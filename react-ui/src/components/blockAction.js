import React from 'react'
import styled from 'styled-components'
import dots, { ReactComponent as Dots } from '../images/blocks/dots-action.svg'
import plus, { ReactComponent as Plus } from '../images/blocks/plus-action.svg'

const BlockAction = ({ type, onClick }) => (
  <Wrapper id='block-action' onClick={onClick}>
    {type === 'dots' ? (
      <Dots fill="var(--color-gray)" width="14px" heigth="14px" />
    ) : (
      <Plus fill="var(--color-gray)" width="14px" heigth="14px" />
    )}
  </Wrapper>
)

export default BlockAction

const Wrapper = styled.div`
  width: 18px;
  height: 24px;

  visibility: hidden;
  display: flex;
  justify-content: center;

  cursor: pointer;

  :hover {
    background-color: var(--color-gray-25);
  }
`
