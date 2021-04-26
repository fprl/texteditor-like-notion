// @refresh reset
// Above code for Error: https://github.com/ianstormtaylor/slate/issues/4081

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Editor } from 'slate'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import { BlockCommands } from './commands/blockCommands'
import { withDivider, withCode } from './plugins/blockPlugins'
import { getLineInformation } from '../../utilities'

import { Paragraph, Heading1, Heading2, Heading3, Code, Blockquote, UnorderedList, OrderedList, Divider } from './Elements/index'
import { BlockMenu, TagMenu, SelectionMenu } from '../Menus/index'
import Leaf from './Leaf/Leaf'
import BlockAction from '../BlockAction/BlockAction'

const CMD_KEY = '/'

const EditableBlock = ({ element, index, addBlock, deleteBlock, updateBlock }) => {
  const [value, setValue] = useState([
    {
      type: element.tag,
      children: [{ text: element.html }],
    },
  ])

  const [blockMenu, setBlockMenu] = useState(false)
  const [tagMenu, setTagMenu] = useState({ isOpen: false, position: { left: null, top: null } })
  const [htmlBackup, setHtmlBackup] = useState(null)

  const editor = useMemo(() => withDivider(withReact(createEditor())), [])

  const renderElement = useCallback(props => {
    switch (props.element.type) {
    case 'h1':
      return <Heading1 {...props} />
    case 'h2':
      return <Heading2 {...props} />
    case 'h3':
      return <Heading3 {...props} />
    case 'code':
      return <Code {...props} />
    case 'block-quote':
      return <Blockquote {...props} />
    case 'ordered-list':
      return <OrderedList {...props} />
    case 'unordered-list':
      return <UnorderedList {...props} />
    case 'divider':
      return <Divider {...props} />
    default:
      return <Paragraph {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const handleOnKeyDown = async e => {
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      editor.insertText('\n')
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      const offsetEndPosition = Editor.end(editor, []).offset
      const currentOffsetPosition = editor.selection.anchor.offset
      const isCaretAtEnd = offsetEndPosition === currentOffsetPosition ? true : false

      if (!isCaretAtEnd && element.tag === 'code') {
        Editor.insertText(editor, '\n')
      }

      if (isCaretAtEnd) {
        addBlock({ id: element.id })
      }
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      const editableLength = BlockCommands.getEditableLength(editor)
      if (editableLength === 0) {
        e.preventDefault()
        deleteBlock({ id: element.id })
      }
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      const editableLength = BlockCommands.getEditableLength(editor)
      const actualBlock = document.querySelector(`[data-block-id='${element.id}']`)
      const caretIndex = getLineInformation(actualBlock).position
      if (caretIndex === 0 || editableLength === 0) {
        const actualBlock = document.querySelector(`[data-block-id='${element.id}']`)
        const previousBlock = actualBlock.previousElementSibling
        previousBlock && previousBlock.querySelector('.content-editable').focus()
        if (!previousBlock) {
          const headerElement = document.querySelector('#title-editable')
          headerElement && headerElement.focus()
        }
      }
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      const editableLength = BlockCommands.getEditableLength(editor)
      const actualBlock = document.querySelector(`[data-block-id='${element.id}']`)
      const caretIndex = getLineInformation(actualBlock).position
      if (caretIndex === editableLength || editableLength === 0) {
        const actualBlock = document.querySelector(`[data-block-id='${element.id}']`)
        const nextBlock = actualBlock.nextElementSibling
        nextBlock && nextBlock.querySelector('.content-editable').focus()
      }
    }

    if (!e.ctrlKey) {
      return
    }

    switch (e.key) {
    // When "B" is pressed, bold the text in the selection.
    case 'b': {
      e.preventDefault()
      BlockCommands.toggleBoldMark(editor)
      break
    }
    }
  }

  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <DataBlock tag={element.tag} data-block-id={element.id} ref={provided.innerRef} {...provided.draggableProps}>
          <ActionsWrapper {...provided.dragHandleProps}>
            <BlockAction
              type="plus"
              color="clear-gray"
              onClick={() => addBlock({ id: element.id })}
            />
            <BlockAction
              type="six-dots"
              color="clear-gray"
              onClick={() => setBlockMenu(blockMenu => !blockMenu)}
            />
          </ActionsWrapper>

          <EditableWrapper>
            <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
              <Editable
                placeholder={element.placeholder}
                className="content-editable"
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={handleOnKeyDown}
              />
              <SelectionMenu />
            </Slate>
          </EditableWrapper>


          {blockMenu && (
            <BlockMenu
              handleSelection={handleTagSelection}
              handleCloseMenu={closeBlockMenu}
            />
          )}
          {tagMenu.isOpen && (
            <TagMenu
              position={tagMenu.position}
              handleSelection={handleTagSelection}
              handleCloseMenu={closeTagMenu}
            />
          )}
        </DataBlock>
      )}
    </Draggable>
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