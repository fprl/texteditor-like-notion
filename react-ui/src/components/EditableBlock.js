import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useEditable } from 'use-editable'
import uid from '../utilities/uid'

const ContentEditable = styled.pre`
  color: blue;
`

const EditableBlock = ({ id, html = '', tag = 'p', addBlock }) => {
  // const [block, setBlock] = useState(html || '')
  // const [tag, setTag] = useState(type || 'p')
  const [block, setBlock] = useState({ id, html, tag })
  const [previousKey, setPreviousKey] = useState('')

  const editorRef = useRef(null)

  const handleUseEditable = (html) => {
    setBlock({ ...block, html })
  }

  useEditable(editorRef, handleUseEditable, {
    indentation: 2,
  })

  const onSelectHandler = (e) => {
    setBlock({ ...block, tag: e.currentTarget.value })
  }

  const onKeyDownHandler = (e) => {
    if (e.key === '/') {
      e.preventDefault()
      console.log('/ was pressed')
    }
    if (e.key === 'Enter') {
      if (previousKey !== 'Shift') {
        e.preventDefault()
        addBlock({
          id: block.id,
          ref: editorRef.current
        })
      }
    }
    if (e.key === 'Backspace' && !block.html) {
      e.preventDefault()
      console.log('Backspace was pressed')
    }
    setPreviousKey(e.key)
  }

  return (
    <>
      <ContentEditable as={block.tag} ref={editorRef} onKeyDown={onKeyDownHandler}>
        {block.html}
      </ContentEditable>
      <select onChange={onSelectHandler} defaultValue={block.tag}>
        <option>p</option>
        <option>h1</option>
        <option>h2</option>
      </select>
    </>
  )
}

export default EditableBlock
