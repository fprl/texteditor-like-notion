import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { useEditable } from 'use-editable'

import { setCaretToEnd } from '../utilities'
import getLineInformation from '../utilities/getLineInformation'
import getCaretCoordinates from '../utilities/getCaretCoordinates'
import { getSelectionIndex } from '../utilities/getSelectionIndex'
import { getSelectionMiddle } from '../utilities/getSelectionMiddle'

import BlockAction from './BlockAction'
import SelectBlockMenu from './SelectBlockMenu'
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
  const [blockMenu, setBlockMenu] = useState(false)
  const [tagMenu, setTagMenu] = useState({
    isOpen: false,
    position: { left: null, top: null },
  })
  const [htmlBackup, setHtmlBackup] = useState(null)

  const blockRef = useRef(null)
  const editableRef = useRef(null)

  // hooks for managing content editable
  const handleUseEditable = (text, position) => {
    const htmlLengthWithoutBreak = text.slice(0, -1).length
    setBlock(block => ({
      ...block,
      html: text,
      htmlLength: htmlLengthWithoutBreak,
    }))
  }

  useEditable(editableRef, handleUseEditable, {
    indentation: 2,
  })


  // use effect for closing menus after changing block tag
  useEffect(() => {
    blockMenu && closeBlockMenu()
    tagMenu.isOpen && closeTagMenu()
  }, [block.tag])

  // use effect for focus on block after closing menus
  useEffect(() => {
    editableRef.current.focus()
    setCaretToEnd(editableRef.current)
  }, [blockMenu, tagMenu.isOpen])


  const handleOnKeyDown = async e => {
    if (!e.shiftKey && e.key === 'Enter') {
      if (blockMenu || tagMenu.isOpen) {
        e.preventDefault()
        return
      }
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
      if (blockMenu || tagMenu.isOpen) {
        e.preventDefault()
        return
      }
      const { top: blockY } = editableRef.current.getBoundingClientRect()
      const { top: caretY } = getCaretCoordinates()
      const differenceBetween = caretY - blockY

      const isInFirstLine =
        differenceBetween < 1 || block.htmlLength === 0 ? true : false

      if (isInFirstLine) {
        const prevElement = blockRef.current.previousElementSibling
        prevElement && prevElement.querySelector('.content-editable').focus()
        if (!prevElement) {
          const headerElement = document.querySelector('#title-editable')
          headerElement && headerElement.focus()
        }
      }
    }

    if (e.key === 'ArrowDown') {
      if (blockMenu || tagMenu.isOpen) {
        e.preventDefault()
        return
      }
      const { bottom: blockB } = editableRef.current.getBoundingClientRect()
      const { bottom: caretB } = getCaretCoordinates()
      const differenceBetween = blockB - caretB

      const caretIndex = getLineInformation(editableRef.current).position
      const lastCharacterIndex = block.htmlLength

      const isInLastLine =
        differenceBetween < 1 ||
        block.htmlLength === 0 ||
        caretIndex === lastCharacterIndex
          ? true
          : false

      if (isInLastLine) {
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
            currentHtmlWithoutBreak +
            userClipText +
            currentHtml.slice(lastCharacterIndex)
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
      // e.preventDefault()
      if (!tagMenu.isOpen) {
        const { left, top } = getCaretCoordinates(true)
        setTagMenu({
          isOpen: true,
          position: { left, top }
        })
      }
    }
  }

  const handleMouseUp = () => {
    const { selectionStart, selectionEnd } = getSelectionIndex(editableRef.current)
    if (selectionStart !== selectionEnd) {
      const { left, top } = getSelectionMiddle()
    }
  }

  const handleTagSelection = (tag, placeholder) => {
    if (tag === block.tag) {
      return
    }
    setBlock({
      ...block,
      tag: tag,
      placeholder: placeholder
    })
  }

  const openTextEditorMenu = () => {
    // get coordinates with getSelectionCoordinates()
  }

  const closeBlockMenu = () => setBlockMenu(false)
  const closeTagMenu = () => setTagMenu({ ...tagMenu, isOpen: false })
  const closeTextEditorMenu = () => setTextEditorMenu({ ...textEditorMenu, isOpen: true })

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
          onClick={() => setBlockMenu(blockMenu => !blockMenu)}
        />
      </ActionsWrapper>

      {blockMenu && (
        <SelectBlockMenu handleSelection={handleTagSelection} handleCloseMenu={closeBlockMenu} />
      )}

      {tagMenu.isOpen && (
        <SelectTagMenu position={tagMenu.position} handleSelection={handleTagSelection} handleCloseMenu={closeTagMenu} />
      )}

      <EditableWrapper>
        <ContentEditable
          className="content-editable"
          // as={block.tag}
          tag={block.tag}
          ref={editableRef}
          data-block-id={block.id}
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
        margin-top: var(--spacing-xs);
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
