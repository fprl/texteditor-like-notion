// @refresh reset
// Above code for Error: https://github.com/ianstormtaylor/slate/issues/4081

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Editor } from 'slate'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import { BlockCommands } from './commands/blockCommands'
import { withDivider } from './plugins/index.js'
import { getLineInformation } from '../../utilities'

import Element from './Element/Element'
import Leaf from './Leaf/Leaf'
import BlockAction from '../BlockAction/BlockAction'
import { BlockMenu, TagMenu, SelectionToolbar } from '../Menus/index'

const CMD_KEY = '/'

const EditableBlock = ({ blocks, addBlock, deleteBlock, updateBlock }) => {

  const [value, setValue] = useState([ ...blocks ])
  console.log(value)

  // const editableProps = {
  //   placeholder: element.placeholder,
  //   id: element.id,
  // }


  return (
    <SlatePlugins
      initialValue={value}
      onChange={value => setValue(value)}
      plugins={plugins}
      components={components}
      options={options}
    >
      <SelectionToolbar />
    </SlatePlugins>
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
