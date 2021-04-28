import React from 'react'
import {
  ToolbarAlign,
  useSlatePluginType,
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_RIGHT,
  ELEMENT_ALIGN_JUSTIFY
} from '@udecode/slate-plugins'

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify'

export const ToolbarButtonsAlign = () => (
  <>
    <ToolbarAlign icon={<FormatAlignLeftIcon />} />
    <ToolbarAlign
      type={useSlatePluginType(ELEMENT_ALIGN_CENTER)}
      icon={<FormatAlignCenterIcon />}
    />
    <ToolbarAlign
      type={useSlatePluginType(ELEMENT_ALIGN_RIGHT)}
      icon={<FormatAlignRightIcon />}
    />
    <ToolbarAlign
      type={useSlatePluginType(ELEMENT_ALIGN_JUSTIFY)}
      icon={<FormatAlignJustifyIcon />}
    />
  </>
)

export default ToolbarButtonsAlign
