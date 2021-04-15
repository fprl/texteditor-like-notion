import getCaretCoordinates from './getCaretCoordinates'

const getSelectionMiddle = () => {
  const { x: startX, y: startY } = getCaretCoordinates(true) // fromStart
  const { x: endX, y: endY } = getCaretCoordinates(false) // fromEnd
  const middleX = startX + (endX - startX) / 2
  return { x: middleX, y: startY }
}

export { getSelectionMiddle }
