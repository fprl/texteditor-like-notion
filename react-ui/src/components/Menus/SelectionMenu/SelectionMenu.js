import React, { useRef, useEffect } from 'react'
import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import styled from 'styled-components'

import { BlockHelpers } from '../../EditableBlock/utilities/blockHelpers'

import Portal from './Portal'
import Button from './Button'
import Icon from './Icon'

const BOLD = 'bold'
const ITALIC = 'italic'
const UNDERLINED = 'underlined'
const STRIKE = 'strikethrough'
const QUOTE = 'block-quote'

const SelectionMenu = () => {
  const menuRef = useRef()
  const currentEditableBlock = useSlate()

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
    BlockHelpers.toggleFormat(currentEditableBlock, format)
  }

  return (
    <Portal>
      <StyledMenu ref={menuRef}>
        <Button onMouseDown={event => handleOnMouseDown(event, BOLD)}>
          <Icon
            icon={BOLD}
            active={BlockHelpers.isFormatActive(currentEditableBlock, BOLD)}
          />
        </Button>

        <Button onMouseDown={event => handleOnMouseDown(event, ITALIC)}>
          <Icon
            icon={ITALIC}
            active={BlockHelpers.isFormatActive(currentEditableBlock, ITALIC)}
          />
        </Button>

        <Button onMouseDown={event => handleOnMouseDown(event, UNDERLINED)}>
          <Icon
            icon={UNDERLINED}
            active={BlockHelpers.isFormatActive(currentEditableBlock, UNDERLINED)}
          />
        </Button>

        <Button onMouseDown={event => handleOnMouseDown(event, STRIKE)}>
          <Icon
            icon={STRIKE}
            active={BlockHelpers.isFormatActive(currentEditableBlock, STRIKE)}
          />
        </Button>

        <Button onMouseDown={event => handleOnMouseDown(event, QUOTE)}>
          <Icon
            icon={QUOTE}
            active={BlockHelpers.isFormatActive(currentEditableBlock, QUOTE)}
          />
        </Button>
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
