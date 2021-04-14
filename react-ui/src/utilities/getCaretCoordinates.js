const getCaretCoordinates = (fromStart = true) => {
  let left, top, bottom
  const isSupported = typeof window.getSelection !== 'undefined'
  if (isSupported) {
    const selection = window.getSelection()
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange()
      range.collapse(fromStart ? true : false)
      const rect = range.getClientRects()[0]
      if (rect) {
        left = rect.left
        top = rect.top
        bottom = rect.bottom
      }
    }
  }
  return { left, top, bottom }
}

export default getCaretCoordinates
