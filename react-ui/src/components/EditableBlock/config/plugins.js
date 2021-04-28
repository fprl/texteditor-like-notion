import {
  // editor
  createReactPlugin,
  createHistoryPlugin,
  // elements
  createParagraphPlugin,
  createBlockquotePlugin,
  createCodeBlockPlugin,
  createHeadingPlugin,
  createListPlugin,
  createTodoListPlugin,
  createLinkPlugin,
  createMediaEmbedPlugin,
  // marks
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createCodePlugin,
  // misc
  createResetNodePlugin,
  createSoftBreakPlugin,
  createExitBreakPlugin,
} from '@udecode/slate-plugins'

import { optionsResetBlockTypePlugin, optionsSoftBreakPlugin, optionsExitBreakPlugin } from './pluginsOptions'

const pluginsList = [
  // editor
  createReactPlugin(), // withReact
  createHistoryPlugin(), // withHistory

  // elements
  createParagraphPlugin(), // paragraph element
  createBlockquotePlugin(), // blockquote element
  createCodeBlockPlugin(), // code block element
  createHeadingPlugin(), // heading elements
  createListPlugin(), // bulleted, numbered, to-dos
  createTodoListPlugin(), // to-do list
  createLinkPlugin(), // link
  createMediaEmbedPlugin(), // embeddable youTube/instagram/tweets/googlemaps

  // marks
  createBoldPlugin(), // bold mark
  createItalicPlugin(), // italic mark
  createUnderlinePlugin(), // underline mark
  createStrikethroughPlugin(), // strikethrough mark
  createCodePlugin(), // code mark

  // misc
  createResetNodePlugin(optionsResetBlockTypePlugin),
  createSoftBreakPlugin(optionsSoftBreakPlugin),
  createExitBreakPlugin(optionsExitBreakPlugin),
]

export default pluginsList
