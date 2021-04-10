import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { useEditable } from 'use-editable'
import useOutsideClick from '../hooks/useOutsideClick'

import BlockAction from './BlockAction'
import SelectTagMenu from './SelectTagMenu'

const CMD_KEY = '/'

const EditableBlock = ({ element, addBlock, deleteBlock, updatePage }) => {
  // const { id, tag, html, placeholder } = element

  const [block, setBlock] = useState({
    id: element.id,
    tag: element.tag,
    html: element.html,
    htmlLength: element.html.length,
    placeholder: element.placeholder,
  })
  const [htmlBackup, setHtmlBackup] = useState(null)
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false)
  const [tagMenuPosition, setTagMenuPosition] = useState({ x: null, y: null })

  const blockRef = useRef(null)
  const editorRef = useRef(null)
  const menuRef = useRef(null)

  // hooks for managing content editable
  const handleUseEditable = (text, position) => {
    setBlock(block => ({
      ...block,
      html: text,
      htmlLength: position.content.length,
    }))
  }

  useEditable(editorRef, handleUseEditable, {
    indentation: 2,
  })

  // hooks for clicking outside of ref (menu)
  useOutsideClick(menuRef, () => {
    if (isTagMenuOpen) setIsTagMenuOpen(false)
  })

  const onKeyDownHandler = e => {
    // core keys
    if (e.key === CMD_KEY) {
      e.preventDefault()
      setHtmlBackup(html)
    }
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      addBlock({
        id: block.id,
        ref: blockRef.current,
      })
    }
    if (e.key === 'Backspace' && block.htmlLength === 0) {
      e.preventDefault()
      deleteBlock({
        id: block.id,
        ref: blockRef.current,
      })
    }

    // navigate between blocks
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevElement = blockRef.current.previousElementSibling
      prevElement && prevElement.querySelector('#content-editable').focus()
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextElement = blockRef.current.nextElementSibling
      nextElement && nextElement.querySelector('#content-editable').focus()
    }
  }

  const handleSelection = tag => {}

  return (
    <DataBlock ref={blockRef} tag={block.tag}>
      <ActionsWrapper>
        <BlockAction
          type={'plus'}
          onClick={() => addBlock({ id: block.id, ref: blockRef.current })}
        />
        <BlockAction
          type={'dots'}
          onClick={() => setIsTagMenuOpen(!isTagMenuOpen)}
        />
      </ActionsWrapper>

      {isTagMenuOpen && (
        <div ref={menuRef}>
          <SelectTagMenu handleSelection={handleSelection} />
        </div>
      )}

      <EditableWrapper tag={block.tag}>
        <ContentEditable
          id="content-editable"
          as={block.tag}
          tag={block.tag}
          ref={editorRef}
          onKeyDown={onKeyDownHandler}
        >
          {block.html}
        </ContentEditable>

        {block.htmlLength === 0 && (
          <PlaceHolder tag={block.tag} placeholder={block.placeholder} />
        )}
      </EditableWrapper>
    </DataBlock>
  )
}

export default EditableBlock

const DataBlock = styled.article`
  position: relative;
  display: flex;
  align-content: flex-start;
  position: relative;

  min-width: 100%;
  max-width: 45rem;

  ${props => {
    if (props.tag === 'h1') {
      return `
        margin-top: var(--spacing-l);
      `
    } else if (props.tag === 'h2') {
      return `
        margin-top: var(--spacing-m);
      `
    } else if (props.tag === 'h3') {
      return `
        margin-top: var(--spacing-s);
      `
    } else {
      return `
        font-size: var(--text-base);
      `
    }
  }}
`

const ActionsWrapper = styled.div`
  position: absolute;
  display: flex;

  top: 0.2rem;
  left: -2.2rem;

  ${DataBlock}:hover & {
    #block-action {
      visibility: visible;
    }
  }
`

const EditableWrapper = styled.div`
  position: relative;
  width: 100%;
`

const ContentEditable = styled.div`
  position: relative;
  margin: var(--spacing-xxs);
  padding: var(--spacing-xxs);
  outline-style: none;

  ${props => {
    if (props.tag === 'h1') {
      return `
        font-size: var(--text-3xl);
        font-weight: 600;
      `
    } else if (props.tag === 'h2') {
      return `
        font-size: var(--text-2xl);
        font-weight: 600;
      `
    } else if (props.tag === 'h3') {
      return `
        font-size: var(--text-xl);
        font-weight: 600;
      `
    } else {
      return `
      `
    }
  }}

  :focus ~ div {
    visibility: visible;
  }
`

const PlaceHolder = styled.div`
  position: absolute;
  top: 0;
  z-index: -1;
  margin: var(--spacing-xxs);
  padding: var(--spacing-xxs);

  visibility: hidden;
  ${props => {
    if (props.tag !== 'p') {
      return `
        visibility: visible;
      `
    }
  }}

  :empty:before {
    content: attr(placeholder);
    color: var(--color-gray);
    ${props => {
      if (props.tag === 'h1') {
        return `
        font-size: var(--text-3xl);
        font-weight: 600;
      `
      } else if (props.tag === 'h2') {
        return `
        font-size: var(--text-2xl);
        font-weight: 600;
      `
      } else if (props.tag === 'h3') {
        return `
        font-size: var(--text-xl);
        font-weight: 600;
      `
      } else {
        return `
      `
      }
    }}
  }
`
