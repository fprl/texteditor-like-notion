import React, { useState } from 'react'
import { SlatePlugins, createSlatePluginsComponents, createSlatePluginsOptions } from '@udecode/slate-plugins'

const components = createSlatePluginsComponents()
const options = createSlatePluginsOptions()

import pluginsBasic from './SlatePlugins/plugins'

const EditableBlock = ({ element, index, addBlock, deleteBlock, updateBlock }) => {
  const [value, setValue] = useState([
    {
      id: element.id,
      type: element.type,
      children: element.children,
      placeholder: element.placeholder,
    },
  ])

  const editableProps = {
    placeholder: element.placeholder,
    style: {
      padding: '15px',
    },
  }

  return (
    <SlatePlugins
      id={element.id}
      editableProps={editableProps}
      initialValue={value}
      onChange={value => setValue(value)}
      plugins={pluginsBasic}
      components={components}
      options={options}
    />
  )
}

export default EditableBlock
