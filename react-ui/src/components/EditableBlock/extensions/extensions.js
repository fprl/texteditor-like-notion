import { defaultExtensions } from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

const extensions = [
  ...defaultExtensions(),
  Underline,
]

export { extensions }
