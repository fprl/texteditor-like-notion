import { uid } from '../utilities'

const blocks = [
  {
    id: uid(),
    type: 'p',
    children: [{ text: 'First block' }],
    placeholder: 'Type \'/\' for commands',
  }
]

const initialPages = [
  {
    information: {
      id: uid(),
      title: 'Your first page!',
      cover: null,
    },
    blocks: [
      {
        id: uid(),
        type: 'p',
        children: [{ text: 'First block' }],
        placeholder: 'Type \'/\' for commands',
      },
      {
        id: uid(),
        children: [{ text: 'Second block' }],
        type: 'h1',
        placeholder: 'Heading 1',
      },
      {
        id: uid(),
        children: [{ text: 'Third block' }],
        type: 'h2',
        placeholder: 'Heading 2',
      },
      {
        id: uid(),
        children: [{ text: 'Fourth block' }],
        type: 'h3',
        placeholder: 'Heading 3',
      },
      {
        id: uid(),
        children: [{ text: 'Fifth block' }],
        type: 'code_block',
        placeholder: 'Code snippet',
      },
      {
        id: uid(),
        children: [{ text: 'Sixth block' }],
        type: 'blockquote',
        placeholder: 'Empty quote',
      },
      {
        id: uid(),
        children: [{ text: 'Ordered list' }],
        type: 'li',
        placeholder: 'List',
      },
      {
        id: uid(),
        children: [{ text: 'Unordered list' }],
        type: 'ol',
        placeholder: 'List',
      },
      {
        id: uid(),
        children: [{ text: '' }],
        type: 'divider',
        placeholder: '',
      },
    ],
  },
  {
    information: {
      id: uid(),
      title: 'Your second page!',
      cover: null,
    },
    blocks: [
      {
        id: uid(),
        type: 'p',
        children: [{ text: 'A paragraph from second page' }],
        placeholder: 'Type \'/\' for commands',
      },
      {
        id: uid(),
        type: 'h1',
        children: [{ text: 'A Heading 1 from second page' }],
        placeholder: 'Type \'/\' for commands',
      },
      {
        id: uid(),
        type: 'h2',
        children: [{ text: 'A Heading 2 from second page' }],
        placeholder: 'Type \'/\' for commands',
      },
      {
        id: uid(),
        type: 'h3',
        children: [{ text: 'A Heading 3 from second page' }],
        placeholder: 'Type \'/\' for commands',
      },
    ],
  },
]

export { initialPages }
