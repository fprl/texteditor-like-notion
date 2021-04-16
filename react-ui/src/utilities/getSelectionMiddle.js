import getCaretCoordinates from './getCaretCoordinates'

const getSelectionMiddle = () => {
  const { left: startX, top: startY } = getCaretCoordinates(true) // fromStart
  const { left: endX, top: endY } = getCaretCoordinates(false) // fromEnd
  const middleX = startX + (endX - startX) / 2
  return { left: middleX, top: startY }
}

export { getSelectionMiddle }
