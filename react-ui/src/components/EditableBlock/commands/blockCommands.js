import { Editor, Node, Text, Transforms } from 'slate'

const getSingleNodeString = n => Node.string(n)
const getStringLength = n => n.map(getSingleNodeString).join('\n').length

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
