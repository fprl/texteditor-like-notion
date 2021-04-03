import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useEditable } from 'use-editable'
import uid from '../utilities/uid'

const ContentEditable = styled.pre`
  color: blue;
`

const EditableBlock = ({ element, addBlock, deleteBlock, updatePage }) => {
  const { id, html, tag } = element

  const [block, setBlock] = useState({ id, html, tag })
  const [previousKey, setPreviousKey] = useState('')
  const [htmlBackup, setHtmlBackup] = useState(null)

  const editorRef = useRef(null)

  const handleUseEditable = html => {
    setBlock({ ...block, html })
  }

  useEditable(editorRef, handleUseEditable, {
    indentation: 2,
  })

/*   const onSelectHandler = e => {
    setBlock({ ...block, tag: e.currentTarget.value })
  } */

  const onKeyDownHandler = e => {
    if (e.key === '/') {
      e.preventDefault()
      console.log('/ was pressed')
    }
    if (e.key === 'Enter') {
      if (previousKey !== 'Shift') {
        e.preventDefault()
        addBlock({
          id,
          ref: editorRef.current,
        })
      }
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
      >
        {block.html}
      </ContentEditable>
    </>
  )
}

export default EditableBlock
