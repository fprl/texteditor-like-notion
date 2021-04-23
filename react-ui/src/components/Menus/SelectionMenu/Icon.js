import React from 'react'

import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'

const Icon = ({ active, icon }) => {
  const style = active
    ? { color: 'var(--color-status-active)', fontSize: 'var(--text-base)' }
    : { color: 'var(--color-text)', fontSize: 'var(--text-base)' }

  if (icon === 'format_bold')
    return <FormatBoldIcon fontSize="small" style={style} />
  if (icon === 'format_italic')
    return <FormatItalicIcon fontSize="small" style={style} />
  if (icon === 'format_underlined')
    return <FormatUnderlinedIcon fontSize="small" style={style} />
}

export default Icon
