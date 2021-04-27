import React from 'react'

import { Paragraph, Heading1, Heading2, Heading3, Code, Blockquote, NumberedList, BulletedList, ListItem, Divider } from './Elements/index'

const Element = (props) => {
  switch (props.element.type) {
  case 'h1':
    return <Heading1 {...props} />
  case 'h2':
    return <Heading2 {...props} />
  case 'h3':
    return <Heading3 {...props} />
  case 'code':
    return <Code {...props} />
  case 'block-quote':
    return <Blockquote {...props} />
  case 'numbered-list':
    return <NumberedList {...props} />
  case 'bulleted-list':
    return <BulletedList {...props} />
  case 'list-item':
    return <ListItem {...props} />
  case 'divider':
    return <Divider {...props} />
  default:
    return <Paragraph {...props} />
  }
}

export default Element
