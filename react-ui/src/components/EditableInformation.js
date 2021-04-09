import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useEditable } from 'use-editable'

import useOutsideClick from '../hooks/useOutsideClick'

import BlockAction from './blockAction'
import SelectTagMenu from './SelectTagMenu'

const EditableInformation = ({ pageInformation, addInformation, deleteInformation, updateInformation }) => {
  const { id, title, cover } = pageInformation

  const [information, setInformation] = useState({ id, title, cover })
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false)

  const informationRef = useRef(null)
  const titleRef = useRef(null)
  const menuRef = useRef(null)

  // effect for managing document title
  useEffect(() => {
    document.title.trim() ? document.title = information.title : document.title = 'Untitled'
  }, [information.title])

  // hooks for managing content editable
  const handleUseEditable = title => {
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
        ref: informationRef.current,
      })
    }
  }

  return (
    <InformationBlock ref={informationRef}>
      <EditableWrapper>
        <TitleEditable
          id="title-editable"
          ref={titleRef}
          onKeyDown={onKeyDownHandler}
        >
          {information.title}
        </TitleEditable>
        {information.title.trim().length === 0 && <PlaceHolder placeholder='Untitled' />}
      </EditableWrapper>
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

const EditableWrapper = styled.div`
  position: relative;
  width: 100%;
`

const TitleEditable = styled.h1`
  margin: var(--spacing-xxs);
  padding: var(--spacing-xxs);
  outline-style: none;

  width: 100%;

  font-size: var(--text-4xl);
  font-weight: 700;
`

const PlaceHolder = styled.div`
  position: absolute;
  top: 0rem;
  z-index: -1;
  margin: var(--spacing-xxs);
  padding: var(--spacing-xxs);

  width: 100%;
  height: 100%;

  :empty:before {
    content: attr(placeholder);
    color: var(--color-gray);
    font-size: var(--text-4xl);
    font-weight: 700;
  }
`