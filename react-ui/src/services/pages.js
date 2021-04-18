import { uid } from '../utilities'

const newPagePrototype = {
  information: {
    id: uid(),
    title: 'Untitled',
    cover: null,
  },
  blocks: [
    {
      id: uid(),
      html: 'First block!',
      tag: 'p',
      placeholder: 'Type \'/\' for commands',
    }
  ]
}

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
        html: 'First block',
        tag: 'p',
        placeholder: 'Type \'/\' for commands',
      },
      {
        id: uid(),
        html: 'Second block',
        tag: 'h1',
        placeholder: 'Heading 1',
      },
      {
        id: uid(),
        html: 'Third block',
        tag: 'h2',
        placeholder: 'Heading 2',
      },
      {
        id: uid(),
        html: 'Fourth block',
        tag: 'h3',
        placeholder: 'Heading 3',
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
        html: 'A simple paragraph from second page',
        tag: 'p',
        placeholder: 'Type \'/\' for commands',
      },
      {
        id: uid(),
        html: 'A heading 1 from second page',
        tag: 'h1',
        placeholder: 'Heading 1',
      },
      {
        id: uid(),
        html: 'Third block',
        tag: 'h2',
        placeholder: 'Heading 2',
      },
      {
        id: uid(),
        html: 'Fourth block',
        tag: 'h3',
        placeholder: 'Heading 3',
      },
    ],
  },
]

export { newPagePrototype, initialPages }
