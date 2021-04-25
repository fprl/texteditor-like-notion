// @refresh reset
// Above code for Error: https://github.com/ianstormtaylor/slate/issues/4081

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import { BlockHelpers } from './utilities/blockHelpers'

import { Paragraph, Heading1, Heading2, Heading3, Code, Blockquote } from './Elements/index'
import { BlockMenu, TagMenu, SelectionMenu } from '../Menus/index'
import Leaf from './Leaf/Leaf'
import BlockAction from '../BlockAction/BlockAction'

const CMD_KEY = '/'

const EditableBlock = ({ element, index, addBlock, deleteBlock, updateBlock }) => {
  const [block, setBlock] = useState({
    id: element.id,
    tag: element.tag,
    html: element.html,
    placeholder: element.placeholder,
  })
  const [blockMenu, setBlockMenu] = useState(false)
  const [tagMenu, setTagMenu] = useState({ isOpen: false, position: { left: null, top: null } })
  const [htmlBackup, setHtmlBackup] = useState(null)

  const [value, setValue] = useState([
    {
      type: element.tag,
      children: [{ text: element.html }],
    },
  ])

  console.log(value[0].children)

  const editor = useMemo(() => withReact(createEditor()), [])

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
    default:
      return <Paragraph {...props} />
    }
  }, [])

  // const renderLeaf = useCallback(props => {
  //   return <Leaf {...props} />
  // }, [])


  const handleOnKeyDown = async e => {
    if (!e.ctrlKey) {
      return
    }

    switch (e.key) {
    // When "`" is pressed, keep our existing code block logic.
    case '`': {
      e.preventDefault()
      BlockHelpers.toggleCodeBlock(editor)
      break
    }

    // When "B" is pressed, bold the text in the selection.
    case 'b': {
      e.preventDefault()
      BlockHelpers.toggleBoldMark(editor)
      break
    }
    }
  }

  return (
    <Draggable draggableId={block.id} index={index}>
      {(provided) => (
        <DataBlock data-block-id={block.id} tag={block.tag} ref={provided.innerRef} {...provided.draggableProps}>
          <ActionsWrapper {...provided.dragHandleProps}>
            <BlockAction
              type="plus"
              color="clear-gray"
              onClick={() => addBlock({ dataBlockId: block.id })}
            />
            <BlockAction
              type="six-dots"
              color="clear-gray"
              onClick={() => setBlockMenu(blockMenu => !blockMenu)}
            />
          </ActionsWrapper>

          <EditableWrapper>
            <Slate editor={editor} value={value} data-block-id={block.id} onChange={newValue => setValue(newValue)}>
              <Editable
                className="content-editable"
                renderElement={renderElement}
                renderLeaf={props => <Leaf {...props} />}
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
