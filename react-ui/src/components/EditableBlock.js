import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useEditable } from 'use-editable'

const CMD_KEY = '/'

const ContentEditable = styled.pre`
  margin: var(--spacing-xxs);
  padding: var(--spacing-xxs);
  width: 100%;
  outline-style: none;

  font-size: ${props => props.tag === 'h1' ? 'var(--text-2xl)' : 'var(--text-base)'};

  :hover {
    background-color: var(--color-hover);
  }

  :focus {
    background-color: white;
  }
`

const EditableBlock = ({ element, addBlock, deleteBlock, updatePage }) => {
  const { id, tag, html } = element

  const [block, setBlock] = useState({ id, tag, html })
  const [htmlBackup, setHtmlBackup] = useState(null)
  const editorRef = useRef(null)

  const handleUseEditable = html => {
    setBlock(block => ({ ...block, html }))
  }

  useEditable(editorRef, handleUseEditable, {
    indentation: 2,
  })

  const onKeyDownHandler = e => {
    // check the CMD, add and delete handlers
    if (e.key === CMD_KEY) {
      e.preventDefault()
      console.log('/ was pressed')
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
    </>
  )
}

export default EditableBlock
