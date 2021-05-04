import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import styled from 'styled-components'

import { extensions } from './extensions/extensions'

import BlockAction from '../BlockAction/BlockAction'
import { BubbleToolbar } from './Toolbars/index'

const CMD_KEY = '/'

const EditableBlock = ({ blocks, addBlock, deleteBlock, updateBlock }) => {
  const editor = useEditor({
    extensions: extensions,
    content: '<p>Hello World! 🌎️</>',
  })

  return (
    <>
      <BubbleToolbar editor={editor} />
      <EditorContent editor={editor}></EditorContent>
    </>
  )
}

export default EditableBlock

const DataBlock = styled.article`
  position: relative;
  display: flex;
  align-content: flex-start;
  position: relative;

  max-width: 38rem;
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
