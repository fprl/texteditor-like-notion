const withLink = editor => {
  const { isInline } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  return editor
}

export default withLink
