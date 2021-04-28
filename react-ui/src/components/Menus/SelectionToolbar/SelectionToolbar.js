import React from 'react'
import styled from 'styled-components'
import { BalloonToolbar } from '@udecode/slate-plugins'

import ToolbarButtonsBasicMarks from './ToolbarButtonsBasicMarks/ToolbarButtonsBasicMarks'

const SelectionToolbar = () => {
  const direction = 'top'
  const hiddenDelay = 0
  const theme = 'light'
  const arrow = false

  return (
    <BalloonToolbar
      direction={direction}
      hiddenDelay={hiddenDelay}
      theme={theme}
      arrow={arrow}
    >
      <ToolbarButtonsBasicMarks />
    </BalloonToolbar>
  )
}

export default SelectionToolbar
