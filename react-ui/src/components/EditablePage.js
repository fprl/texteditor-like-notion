import React, { useEffect, useState } from 'react'
import EditableBlock from './EditableBlock'
import uid from '../utilities/uid'

const initialBlock = [
  {
    id: uid(),
    html: 'First block',
    tag: 'p',
  },
  {
    id: uid(),
    html: 'Second block',
    tag: 'h1',
  },
]

const EditablePage = () => {
  const [blocks, setBlocks] = useState(initialBlock)
  console.log(blocks)

/*   useEffect(() => {
    console.log('Testing')
  }, [blocks.length]) */

  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: uid(), html: '', tag: 'p' }

    const index = blocks.map((b) => b.id).indexOf(currentBlock.id)
    const updatedBlocks = [...blocks]
    updatedBlocks.splice(index + 1, 0, newBlock)

    setBlocks([ ...updatedBlocks ])
    // const focus = () => currentBlock.ref.nextElementSibling.focus()
  }

  return (
    <div className="page">
      {blocks.map((block) => (
        <EditableBlock
          key={block.id}
          id={block.id}
          html={block.html}
          tag={block.tag}
          addBlock={addBlockHandler}
        />
      ))}
    </div>
  )
}

export default EditablePage
