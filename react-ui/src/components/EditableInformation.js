import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useEditable } from 'use-editable'

import useOutsideClick from '../hooks/useOutsideClick'

import BlockAction from './blockAction'
import SelectTagMenu from './SelectTagMenu'

const EditableInformation = ({ pageInformation, addInformation, deleteInformation, updateInformation }) => {
  console.log(pageInformation)
  const { id, title, cover } = pageInformation

  const [information, setInformation] = useState({ id, title, cover })
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false)


  const informationRef = useRef(null)
  const titleRef = useRef(null)
  const menuRef = useRef(null)

  // hooks for managing content editable
  const handleUseEditable = html => {
    setInformation(information => ({ ...information, title }))
  }

  useEditable(titleRef, handleUseEditable, {
    indentation: 0,
  })

  // hooks for clicking outside of ref (menu)
  useOutsideClick(menuRef, () => {
    if (isTagMenuOpen) setIsTagMenuOpen(false)
  })

  const onKeyDownHandler = e => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      addBlock({
        id,
        ref: blockRef.current,
      })
    }
  }

  return (
    <InformationBlock ref={informationRef}>
      <TitleEditable
        id="title-editable"
        ref={titleRef}
        onKeyDown={onKeyDownHandler}
      >
        {information.title}
      </TitleEditable>
    </InformationBlock>
  )
}

export default EditableInformation

const InformationBlock = styled.article`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 45rem;
  height: 100%;
`

const TitleEditable = styled.h1`
  margin: var(--spacing-xxs);
  padding: var(--spacing-xxs);
  outline-style: none;

  width: 100%;

  font-size: var(--text-4-l);

  :hover {
    background-color: var(--color-hover);
  }

  :focus {
    background-color: var(--color-background);
  }
`
