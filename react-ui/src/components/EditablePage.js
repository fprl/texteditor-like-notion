import React, { useCallback, useEffect, useState } from 'react'
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
  const [lastBlock, setlastBlock] = useState()

  useEffect(() => {
    lastBlock && lastBlock.nextElementSibling.focus()
  }, [lastBlock])

  const updatePageHandler = updatedBlock => {
    const index = blocks.map(b => b.id).indexOf(updatedBlock.id)
    const updatedBlocks = [...blocks]
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
    }

    setBlocks([...updatedBlock])
  }

  const addBlockHandler = currentBlock => {
    const lastBlock = { id: uid(), html: '', tag: 'p' }

    const index = blocks.map(b => b.id).indexOf(currentBlock.id)
    const updatedBlocks = [...blocks]
    updatedBlocks.splice(index + 1, 0, lastBlock)

    setBlocks([...updatedBlocks])
    setlastBlock(currentBlock.ref)
  }

  const deleteBlockHandler = currentBlock => {
    const previousBlock = currentBlock.ref.previousElementSibling

    const index = blocks.map(b => b.id).indexOf(currentBlock.id)
    const updatedBlocks = [ ...blocks ]
    updatedBlocks.splice(index, 1)

    setBlocks([...updatedBlocks])
    previousBlock && previousBlock.focus()
  }

  return (
    <div className="page">
      {blocks.map(block => (
        <EditableBlock
          key={block.id}
          element={block}
          addBlock={addBlockHandler}
          deleteBlock={deleteBlockHandler}
          updatePage={updatePageHandler}
        />
      ))}
    </div>
  )
}

export default EditablePage
