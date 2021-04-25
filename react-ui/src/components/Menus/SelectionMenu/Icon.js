import React from 'react'

import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'

const BOLD = 'bold'
const ITALIC = 'italic'
const UNDERLINED = 'underlined'
const STRIKE = 'strikethrough'
const QUOTE = 'block-quote'

const Icon = ({ active, icon }) => {

  const style = active
    ? { color: 'var(--color-status-active)', fontSize: 'var(--text-base)' }
    : { color: 'var(--color-text)', fontSize: 'var(--text-base)' }

  if (icon === BOLD)
    return <FormatBoldIcon fontSize="small" style={style} />
  if (icon === ITALIC)
    return <FormatItalicIcon fontSize="small" style={style} />
  if (icon === UNDERLINED)
    return <FormatUnderlinedIcon fontSize="small" style={style} />
  if (icon === STRIKE)
    return <FormatStrikethroughIcon fontSize="small" style={style} />
  if (icon === QUOTE)
    return <FormatQuoteIcon fontSize="small" style={style} />
}

export default Icon
