import React, { useRef, useEffect } from 'react'
import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import styled from 'styled-components'

import { BlockCommands } from '../../EditableBlock/commands/blockCommands'

import Portal from './Portal'
import Button from './Button'
import Icon from './Icon'

const BOLD = 'bold'
const ITALIC = 'italic'
const UNDERLINED = 'underlined'
const STRIKE = 'strikethrough'
const CODE = 'code'

const SelectionMenu = () => {
  const menuRef = useRef()
  const currentEditableBlock = useSlate()
  const currentEditableBlockType = currentEditableBlock.children[0].type

  useEffect(() => {
    const menu = menuRef.current
    const { selection } = currentEditableBlock

    if (!menu) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(currentEditableBlock) ||
      Range.isCollapsed(selection) ||
      Editor.string(currentEditableBlock, selection) === ''
    ) {
      menu.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()
    const domRange = domSelection.getRangeAt(0)
    const domRect = domRange.getBoundingClientRect()

    menu.style.opacity = '5'
    menu.style.top = `${domRect.top + window.pageYOffset - menu.offsetHeight}px`
    menu.style.left = `${
      domRect.left + window.pageXOffset - menu.offsetWidth / 2 + domRect.width / 2
    }px`
  })

  const handleOnMouseDown = (event, format) => {
    event.preventDefault()
    BlockCommands.toggleFormat(currentEditableBlock, format)
  }

  return (
    <Portal>
      <StyledMenu ref={menuRef}>
        <Button onMouseDown={event => handleOnMouseDown(event, BOLD)}>
          <Icon
            icon={BOLD}
            active={BlockCommands.isFormatActive(currentEditableBlock, BOLD)}
          />
        </Button>

        <Button onMouseDown={event => handleOnMouseDown(event, ITALIC)}>
          <Icon
            icon={ITALIC}
            active={BlockCommands.isFormatActive(currentEditableBlock, ITALIC)}
          />
        </Button>

        <Button onMouseDown={event => handleOnMouseDown(event, UNDERLINED)}>
          <Icon
            icon={UNDERLINED}
            active={BlockCommands.isFormatActive(currentEditableBlock, UNDERLINED)}
          />
        </Button>

        <Button onMouseDown={event => handleOnMouseDown(event, STRIKE)}>
          <Icon
            icon={STRIKE}
            active={BlockCommands.isFormatActive(currentEditableBlock, STRIKE)}
          />
        </Button>

        {currentEditableBlockType === 'code' ? null : (
          <>
            <Button onMouseDown={event => handleOnMouseDown(event, CODE)}>
              <Icon
                icon={CODE}
                active={BlockCommands.isFormatActive(currentEditableBlock, CODE)}
              />
            </Button>
          </>
        )}
      </StyledMenu>
    </Portal>
  )
}

export default SelectionMenu

const StyledMenu = styled.div`
  display: flex;
  flex-direction: row;

  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;

  opacity: 0;
  border-radius: 6px;
  transition: opacity 0.75s;
`
