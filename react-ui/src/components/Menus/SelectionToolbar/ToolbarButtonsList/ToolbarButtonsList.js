import React from 'react'
import {
  useSlatePluginType,
  ToolbarList,
  ELEMENT_UL,
  ELEMENT_OL
} from '@udecode/slate-plugins'

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'

export const ToolbarButtonsList = () => (
  <>
    <ToolbarList
      type={useSlatePluginType(ELEMENT_UL)}
      icon={<FormatListBulletedIcon />}
    />
    <ToolbarList
      type={useSlatePluginType(ELEMENT_OL)}
      icon={<FormatListNumberedIcon />}
    />
  </>
)

export default ToolbarButtonsList
