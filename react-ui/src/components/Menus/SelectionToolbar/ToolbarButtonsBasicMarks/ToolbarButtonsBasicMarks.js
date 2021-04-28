import React from 'react'
import {
  useSlatePluginType,
  ToolbarMark,
  ToolbarLink,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_CODE,
} from '@udecode/slate-plugins'

import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough'
import CodeIcon from '@material-ui/icons/Code'
import LinkIcon from '@material-ui/icons/Link';

export const ToolbarButtonsBasicMarks = () => {
  const tooltip = {
    arrow: true,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: 'top',
    theme: 'dark',
  }

  return (
    <>
      <ToolbarMark
        type={useSlatePluginType(MARK_BOLD)}
        icon={<FormatBoldIcon />}
        tooltip={{ content: 'Bold (Ctrl+B)', ...tooltip }}
      />
      <ToolbarMark
        type={useSlatePluginType(MARK_ITALIC)}
        icon={<FormatItalicIcon />}
        tooltip={{ content: 'Italic (Ctrl+I)', ...tooltip }}
      />
      <ToolbarMark
        type={useSlatePluginType(MARK_UNDERLINE)}
        icon={<FormatUnderlinedIcon />}
        tooltip={{ content: 'Underline (Ctrl+U)', ...tooltip }}
      />
      <ToolbarMark
        type={useSlatePluginType(MARK_STRIKETHROUGH)}
        icon={<FormatStrikethroughIcon />}
        tooltip={{ content: 'Strikethrough (Ctrl+S)', ...tooltip }}
      />
      <ToolbarMark
        type={useSlatePluginType(MARK_CODE)}
        icon={<CodeIcon />}
        tooltip={{ content: 'Inline-code (Ctrl+E)', ...tooltip }}
      />
      <ToolbarLink
        icon={<LinkIcon />}
      />
    </>
  )
}

export default ToolbarButtonsBasicMarks
