import React, { useRef, useEffect } from 'react'
import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import styled from 'styled-components'

import Portal from './Portal'
import Button from './Button'
import Icon from './Icon'

const BOLD = 'bold'
const ITALIC = 'italic'
const UNDERLINED = 'underlined'
const STRIKE = 'strikethrough'
const CODE = 'code'

const SelectionToolbar = () => {
  const menuRef = useRef()
  const editableBlock = useSlate()
  const editableBlockType = editableBlock.children[0].type

  useEffect(() => {
    const menu = menuRef.current
    const { selection } = editableBlock

    if (!menu) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editableBlock) ||
      Range.isCollapsed(selection) ||
      Editor.string(editableBlock, selection) === ''
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

  const toggleFormatTo = (format) => {
    BlockCommands.toggleFormat(editableBlock, format)
  }

  return (
    <Portal>
      <StyledMenu ref={menuRef}>
        <Button onMouseDown={() => toggleFormatTo(BOLD)}>
          <Icon
            icon={BOLD}
            active={BlockCommands.isFormatActive(editableBlock, BOLD)}
          />
        </Button>

        <Button onMouseDown={() => toggleFormatTo(ITALIC)}>
          <Icon
            icon={ITALIC}
            active={BlockCommands.isFormatActive(editableBlock, ITALIC)}
          />
        </Button>

        <Button onMouseDown={() => toggleFormatTo(UNDERLINED)}>
          <Icon
            icon={UNDERLINED}
            active={BlockCommands.isFormatActive(editableBlock, UNDERLINED)}
          />
        </Button>

        <Button onMouseDown={() => toggleFormatTo(STRIKE)}>
          <Icon
            icon={STRIKE}
            active={BlockCommands.isFormatActive(editableBlock, STRIKE)}
          />
        </Button>

        {editableBlockType === 'code' ? null : (
          <>
            <Button onMouseDown={() => toggleFormatTo(CODE)}>
              <Icon
                icon={CODE}
                active={BlockCommands.isFormatActive(editableBlock, CODE)}
              />
            </Button>
          </>
        )}
      </StyledMenu>
    </Portal>
  )
}

export default SelectionToolbar

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
