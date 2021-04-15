import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { useEditable } from 'use-editable'
import useOutsideClick from '../hooks/useOutsideClick'

import getLineInformation from '../utilities/getLineInformation'
import getCaretCoordinates from '../utilities/getCaretCoordinates'
import { getSelectionIndex } from '../utilities/getSelectionIndex'
import { getSelectionMiddle } from '../utilities/getSelectionMiddle'

import BlockAction from './BlockAction'
import SelectTagMenu from './SelectTagMenu'

const CMD_KEY = '/'

const EditableBlock = ({ element, addBlock, deleteBlock, updatePage }) => {
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
  const editableRef = useRef(null)
  const tagMenuRef = useRef(null)

  // hooks for managing content editable
  const handleUseEditable = (text, position) => {
    const htmlWithoutBreak = text.slice(0, -1)
    setBlock(block => ({
      ...block,
      html: text,
      htmlLength: htmlWithoutBreak.length,
    }))
  }

  useEditable(editableRef, handleUseEditable, {
    indentation: 2,
  })

  // hooks for clicking outside of ref (menu)
  useOutsideClick(tagMenuRef, () => {
    if (isTagMenuOpen) setIsTagMenuOpen(false)
  })


  const handleOnKeyDown = async e => {
    // core keys
    if (e.key === CMD_KEY) {
      e.preventDefault()
      setHtmlBackup(block.html)
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
      const { top: blockY } = editableRef.current.getBoundingClientRect()
      const { top: caretY } = getCaretCoordinates()
      const differenceBetween = caretY - blockY

      const isInFirstLine = differenceBetween < 1 || block.htmlLength === 0 ? true : false

      if (isInFirstLine) {
        e.preventDefault()
        const prevElement = blockRef.current.previousElementSibling
        prevElement && prevElement.querySelector('.content-editable').focus()
        if (!prevElement) {
          const headerElement = document.querySelector('#title-editable')
          headerElement && headerElement.focus()
        }
      }
    }

    if (e.key === 'ArrowDown') {
      const { bottom: blockB } = editableRef.current.getBoundingClientRect()
      const { bottom: caretB } = getCaretCoordinates()
      const differenceBetween = blockB - caretB

      const caretIndex = getLineInformation(editableRef.current).position
      const lastCharacterIndex = block.htmlLength

      const isInLastLine = differenceBetween < 1 || block.htmlLength === 0 || caretIndex === lastCharacterIndex ? true : false

      if (isInLastLine) {
        e.preventDefault()
        const nextElement = blockRef.current.nextElementSibling
        nextElement && nextElement.querySelector('.content-editable').focus()
      }
    }

    // handling ctrl + v (paste)
    if (e.ctrlKey && e.key === 'v') {
      e.preventDefault()
      let formattedUserClipText
      let formattedHtml

      const userClipText = await navigator.clipboard.readText()
      formattedUserClipText = userClipText.split('\n')
      const userClipTextBreaks = formattedUserClipText.filter(
        paragraph => paragraph.length !== 1
      )

      // if user paste more than one paragraph
      if (userClipTextBreaks.length > 1) {
        addBlock({ id: block.id, ref: blockRef.current }, userClipTextBreaks)
      }

      // normal behavior to correct the '\n' that's always present
      if (userClipTextBreaks.length === 1) {
        const currentHtml = block.html
        const caretIndex = getLineInformation(editableRef.current).position
        const lastCharacterIndex = block.htmlLength
        const isInLastLine = caretIndex === lastCharacterIndex ? true : false

        const currentHtmlWithoutBreak = currentHtml.slice(0, lastCharacterIndex)

        if (isInLastLine) {
          formattedHtml = currentHtmlWithoutBreak + userClipText + '\n'
        } else {
          formattedHtml =
            currentHtmlWithoutBreak
            + userClipText
            + currentHtml.slice(lastCharacterIndex)
        }

        setBlock(block => ({
          ...block,
          html: formattedHtml,
          htmlLength: formattedHtml.length - 1,
        }))
      }
    }
  }

  const handleOnKeyUp = e => {
    if (e.key === CMD_KEY) {
      e.preventDefault()
      const { left, top } = getCaretCoordinates(true)
      console.log(left, top)
    }
  }

  const handleMouseUp = e => {
    const { selectionStart, selectionEnd } = getSelectionIndex(editableRef.current)
    if (selectionStart !== selectionEnd) {
      const { x, y } = getSelectionMiddle(editableRef.current)
      console.log(x, y)
    }
  }

  const openTextEditorMenu = () => {
    console.log(e)
    // get coordinates with getSelectionCoordinates()
    // set action menu position and open status
    // remember to add ref for clicking outside (like other menu)
  }

  const handleSelection = tag => {}

  return (
    <DataBlock ref={blockRef} tag={block.tag}>
      <ActionsWrapper>
        <BlockAction
          type="plus"
          color="clear-gray"
          onClick={() => addBlock({ id: block.id, ref: blockRef.current })}
        />
        <BlockAction
          type="six-dots"
          color="clear-gray"
          onClick={() => setIsTagMenuOpen(!isTagMenuOpen)}
        />
      </ActionsWrapper>

      {isTagMenuOpen && (
        <div ref={tagMenuRef}>
          <SelectTagMenu handleSelection={handleSelection} />
        </div>
      )}

      <EditableWrapper tag={block.tag}>
        <ContentEditable
          className="content-editable"
          as={block.tag}
          tag={block.tag}
          ref={editableRef}
          onKeyDown={handleOnKeyDown}
          onKeyUp={handleOnKeyUp}
          onMouseUp={handleMouseUp}
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

  max-width: 38rem;

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

  left: -2.3rem;

  ${DataBlock}:hover & {
    #block-action {
      visibility: visible;
    }
  }
`

const EditableWrapper = styled.div`
  position: relative;
  width: 100%;

  padding: var(--spacing-xxs) var(--spacing-xxs);
`

const ContentEditable = styled.div`
  position: relative;

  word-break: break-all;
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
  margin: var(--spacing-xxs) 0;

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
