import React, { useRef, useEffect } from 'react'
import { BubbleMenu } from '@tiptap/react'
import styled from 'styled-components'

import Portal from './Portal'
import Button from './Button'
import Icon from './Icon'

const BOLD = 'bold'
const ITALIC = 'italic'
const UNDERLINED = 'underline'
const STRIKE = 'strike'
const CODE = 'code'

const BubbleToolbar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const isFormatActive = format => {
    const status = editor.isActive(format)
    const style = status ? true : false
    return style
  }

  return (
    <StyledMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Button onMouseDown={() => editor.chain().focus().toggleBold().run()}>
        <Icon icon={BOLD} active={isFormatActive(BOLD)} />
      </Button>

      <Button onMouseDown={() => editor.chain().focus().toggleItalic().run()}>
        <Icon icon={ITALIC} active={isFormatActive(ITALIC)} />
      </Button>

      <Button
        onMouseDown={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Icon icon={UNDERLINED} active={isFormatActive(UNDERLINED)} />
      </Button>

      <Button onMouseDown={() => editor.chain().focus().toggleStrike().run()}>
        <Icon icon={STRIKE} active={isFormatActive(STRIKE)} />
      </Button>

      <Button onMouseDown={() => editor.chain().focus().toggleCode().run()}>
        <Icon icon={CODE} active={isFormatActive(CODE)} />
      </Button>
    </StyledMenu>
  )
}

export default BubbleToolbar

const StyledMenu = styled(BubbleMenu)`
  display: flex;
  /* flex-direction: row;

  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;

  opacity: 0;
  border-radius: 6px;
  transition: opacity 0.75s; */
`
