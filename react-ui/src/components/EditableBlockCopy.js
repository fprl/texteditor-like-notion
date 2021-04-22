import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import CodeElement from './CodeElement'
import DefaultElement from './DefaultElement'

import BlockAction from './BlockAction'
import SelectBlockMenu from './SelectBlockMenu'
import SelectTagMenu from './SelectTagMenu'

const CMD_KEY = '/'

const EditableBlock = ({ element, index, addBlock, deleteBlock, updateBlock }) => {
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

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: element.html }],
    },
  ])

  const blockRef = useRef(null)
  const editor = useMemo(() => withReact(createEditor()), [])

  const handleOnKeyDown = async e => {
    if (e.key === '`' && e.ctrlKey) {
      e.preventDefault()
      // Determine whether any of the currently selected blocks are code blocks.
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })
      // Toggle the block type depending on whether there's already a match.
      Transforms.setNodes(
        editor,
        { type: 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )
    }
  }

  const renderElement = useCallback(props => {
    switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />
    default:
      return <DefaultElement {...props} />
    }
  }, [])

  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <DataBlockWrapper ref={blockRef} {...provided.draggableProps}>
          <DataBlock ref={provided.innerRef} tag={block.tag}>
            <ActionsWrapper {...provided.dragHandleProps}>
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
              <Slate editor={editor} value={value} data-block-id={block.id} onChange={newValue => setValue(newValue)}>
                <Editable
                  className="content-editable"
                  renderElement={renderElement}
                  onKeyDown={handleOnKeyDown}
                />
              </Slate>

              {block.htmlLength === 0 && (
                <PlaceHolder tag={block.tag} placeholder={block.placeholder} />
              )}
            </EditableWrapper>
          </DataBlock>
        </DataBlockWrapper>
      )}
    </Draggable>
  )
}

export default EditableBlock

const DataBlockWrapper = styled.li`
`

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
