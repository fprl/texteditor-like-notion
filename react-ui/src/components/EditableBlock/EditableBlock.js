import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { defaultExtensions } from '@tiptap/starter-kit'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import { withDivider } from './plugins/index.js'

import BlockAction from '../BlockAction/BlockAction'
import { BlockMenu, TagMenu, SelectionToolbar } from '../Menus/index'

const CMD_KEY = '/'

const EditableBlock = ({ blocks, addBlock, deleteBlock, updateBlock }) => {
  const editor = useEditor({
    extensions: defaultExtensions(),
    content: '<p>Hello World! 🌎️</>',
  })

  return <EditorContent editor={editor}></EditorContent>
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
