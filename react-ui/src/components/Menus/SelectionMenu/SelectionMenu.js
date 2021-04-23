import React, { useRef, useEffect } from 'react'
import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import styled from 'styled-components'

import { BlockHelpers } from '../../EditableBlock/utilities/blockHelpers'

import Portal from './Portal'
import Button from './Button'
import Icon from './Icon'

const SelectionMenu = () => {
  const menuRef = useRef()
  const editor = useSlate()

  useEffect(() => {
    const el = menuRef.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()
    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()
    el.style.opacity = '5'
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`
  })

  return (
    <Portal>
      <StyledMenu ref={menuRef}>
        <Button format="bold">
          <Icon
            icon="format_bold"
            active={BlockHelpers.isFormatActive(editor, 'bold')}
          />
        </Button>
        <Button format="italic">
          <Icon
            icon="format_italic"
            active={BlockHelpers.isFormatActive(editor, 'italic')}
          />
        </Button>
        <Button format="underlined">
          <Icon
            icon="format_underlined"
            active={BlockHelpers.isFormatActive(editor, 'underlined')}
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
