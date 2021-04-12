// Borrow from the amazing https://github.com/kitten/use-editable custom hook.

const getCurrentRange = () => window.getSelection().getRangeAt(0)

const getLineInformation = element => {
  const range = getCurrentRange()
  const extent = !range.collapsed ? range.toString().length : 0
  const untilRange = document.createRange()
  untilRange.setStart(element, 0)
  untilRange.setEnd(range.startContainer, range.startOffset)
  let content = untilRange.toString()
  const position = content.length
  const lines = content.split('\n')
  const line = lines.length - 1
  content = lines[line]
  return { position, extent, content, line }
}

export default getLineInformation
