import React, { useMemo, useState } from 'react'
import { SlatePlugins, createSlatePluginsComponents, createSlatePluginsOptions, useStoreEditor } from '@udecode/slate-plugins'

import pluginsList from './config/plugins'

import { SelectionToolbar } from '../Menus/index'

const EditableBlock = ({ blocks, addBlock, deleteBlock, updateBlock }) => {

  const [value, setValue] = useState([ ...blocks ])
  console.log(value)

  // const editableProps = {
  //   placeholder: element.placeholder,
  //   id: element.id,
  // }

  const components = createSlatePluginsComponents()
  const options = createSlatePluginsOptions()
  const plugins = useMemo(() => pluginsList)

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
