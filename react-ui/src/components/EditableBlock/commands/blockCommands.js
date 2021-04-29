import { Editor, Element, Node, Text, Transforms } from 'slate'

const getSingleNodeString = n => Node.string(n)
const getStringLength = n => n.map(getSingleNodeString).join('\n').length
const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  })

  return !!match
}

const BlockCommands = {
  getEditableLength(editor) {
    return getStringLength(editor.children)
  },

  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })

    return !!match
  },

  isFormatActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: n => n[format] === true,
      mode: 'all',
    })
    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = BlockCommands.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleList(editor, format) {
    const LIST_TYPES = ['numbered-list', 'bulleted-list']
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
      match: n =>
        LIST_TYPES.includes(
          !Editor.isEditor(n) && Element.isElement(n) && n.type
        ),
      split: true,
    })
    const newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  },

  toggleFormat(editor, format) {
    const isActive = BlockCommands.isFormatActive(editor, format)
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: Text.isText, split: true }
    )
  },
}

export { BlockCommands }
