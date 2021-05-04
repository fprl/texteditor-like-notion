import React, { useState, useRef, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { defaultExtensions } from '@tiptap/starter-kit'
import styled from 'styled-components'

const PageHeader = ({ information, addInformation, deleteInformation, updateInformation }) => {
  const editor = useEditor({
    extensions: defaultExtensions(),
    content: '<p>Hello World! 🌎️</>',
  })
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false)

  const headerRef = useRef(null)
  const titleRef = useRef(null)
  const menuRef = useRef(null)

  // effect for managing page change
  useEffect(() => {
    setHeader({
      ...header,
      ...information
    })
  }, [information.title])

  // effect for managing document title change
  useEffect(() => {
    header.title.trim().length > 0 ? document.title = header.title : document.title = 'Untitled'
  }, [header.title])

  return <EditorContent editor={editor}></EditorContent>
}

export default PageHeader

const HeaderBlock = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 5rem;
  width: 50%;
  height: 10rem;
`

const EditableWrapper = styled.div`
  position: relative;
  width: 100%;

  padding: var(--spacing-xxs) var(--spacing-xxs);
`

const TitleEditable = styled.h1`
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
