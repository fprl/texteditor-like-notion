import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useEditable } from 'use-editable'
import SelectMenu from './SelectTagMenu'

const CMD_KEY = '/'

const ContentEditable = styled.pre`
  margin: var(--spacing-xxs);
  padding: var(--spacing-xxs);
  width: 100%;
  outline-style: none;

  font-size: ${props =>
    props.tag === 'h1' ? 'var(--text-2xl)' : 'var(--text-base)'};

  :hover {
    background-color: var(--color-hover);
  }

  :focus {
    background-color: var(--color-background);
  }
`

const EditableBlock = ({ element, addBlock, deleteBlock, updatePage }) => {
  const { id, tag, html } = element

  const [block, setBlock] = useState({ id, tag, html })
  const [htmlBackup, setHtmlBackup] = useState(null)

  const [isTagMenuOpen, setIsTagMenuOpen] = useState(true)
  const [tagMenuPosition, setTagMenuPosition] = useState({ x: null, y: null })

  const editorRef = useRef(null)

  const handleUseEditable = html => {
    setBlock(block => ({ ...block, html }))
  }

  useEditable(editorRef, handleUseEditable, {
    indentation: 2,
  })

  const onKeyDownHandler = e => {
    if (e.key === CMD_KEY) {
      e.preventDefault()
      setHtmlBackup(html)
    }
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      addBlock({
        id,
        ref: editorRef.current,
      })
    }
    if (e.key === 'Backspace' && !block.html.trim()) {
      e.preventDefault()
      deleteBlock({
        id: id,
        ref: editorRef.current,
      })
    }
  }

  const handleSelection = tag => {}

  return (
    <>
      <ContentEditable
        as={block.tag}
        ref={editorRef}
        onKeyDown={onKeyDownHandler}
        tag={block.tag}
      >
        {block.html}
      </ContentEditable>

      {isTagMenuOpen && <SelectMenu />}
    </>
  )
}

export default EditableBlock
