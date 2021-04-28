import React, { useMemo, useState } from 'react'
import { SlatePlugins, createSlatePluginsComponents, createSlatePluginsOptions, useStoreEditor } from '@udecode/slate-plugins'

import pluginsList from './config/plugins'

import { SelectionToolbar } from '../Menus/index'

const EditableBlock = ({ element, index, addBlock, deleteBlock, updateBlock }) => {
  const [value, setValue] = useState([
    {
      id: element.id,
      type: element.type,
      children: element.children,
      placeholder: element.placeholder,
    },
  ])

  const handleOnKeyUp = async e => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault()
      addBlock({ id: element.id })
    }

    if (e.ctrlKey && e.key === 'Backspace') {
      e.preventDefault()
      deleteBlock({ id: element.id })
    }
  }

  const editableProps = {
    placeholder: element.placeholder,
    id: element.id,
    onKeyUp: e => handleOnKeyUp(e)
  }

  const components = createSlatePluginsComponents()
  const options = createSlatePluginsOptions()
  const plugins = useMemo(() => pluginsList)

  return (
    <SlatePlugins
      id={element.id}
      data-block-id='hi'
      initialValue={value}
      onChange={value => setValue(value)}
      plugins={plugins}
      components={components}
      options={options}
      editableProps={editableProps}
    >
      <SelectionToolbar />
    </SlatePlugins>
  )
}

export default EditableBlock
