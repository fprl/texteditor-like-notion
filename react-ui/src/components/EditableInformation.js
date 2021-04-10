import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useEditable } from 'use-editable'

import useOutsideClick from '../hooks/useOutsideClick'

import BlockAction from './BlockAction'
import SelectTagMenu from './SelectTagMenu'

const EditableInformation = ({ information, addInformation, deleteInformation, updateInformation }) => {
  const [header, setHeader] = useState({
    pageId: information.id,
    title: information.title,
    titleLength: information.title.length,
    cover: information.cover
  })
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false)

  const headerRef = useRef(null)
  const titleRef = useRef(null)
  const menuRef = useRef(null)

  // effect for managing document title
  useEffect(() => {
    console.log(header.titleLength)
    header.titleLength > 0 ? document.title = header.title : document.title = 'Untitled'
  }, [header.title])

  // hooks for managing content editable
  const handleUseEditable = (title, position) => {
    setHeader(header => ({
      ...header,
      title,
      titleLength: position.content.length
    }))
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
      addInformation({
        pageId: header.pageId,
        ref: headerRef.current,
      })
    }

    // navigate between sections
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const firstElement = document.querySelector('.content-editable')
      if (firstElement) {
        firstElement.focus()
        return
      }
    }
  }

  return (
    <HeaderBlock ref={headerRef}>
      <EditableWrapper>
        <TitleEditable
          id="title-editable"
          ref={titleRef}
          onKeyDown={onKeyDownHandler}
        >
          {header.title}
        </TitleEditable>
        {header.titleLength === 0 && <PlaceHolder placeholder='Untitled' />}
      </EditableWrapper>
    </HeaderBlock>
  )
}

export default EditableInformation

const HeaderBlock = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 100%;
  max-width: 45rem;
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

  font-size: var(--text-4xl);
  font-weight: 700;
`

const PlaceHolder = styled.div`
  position: absolute;
  top: 0rem;
  z-index: -1;
  margin: var(--spacing-xxs);
  padding: var(--spacing-xxs);

  :empty:before {
    content: attr(placeholder);
    color: var(--color-gray);
    font-size: var(--text-4xl);
    font-weight: 700;
  }
`
