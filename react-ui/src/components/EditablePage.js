import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { usePrevious } from '../hooks'
import { uid, setCaretToEnd } from '../utilities'

import EditableBlock from './EditableBlock'

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
  const prevBlocks = usePrevious(blocks)

  useEffect(() => {
    console.group('Mount')
    console.log('previous blocks: ', prevBlocks)
    console.log('actual blocks: ', blocks)
    console.groupEnd()

    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      lastBlock && lastBlock.nextElementSibling.querySelector('#content-editable').focus()
    } else if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      lastBlock && setCaretToEnd(lastBlock.querySelector('#content-editable'))
    }
  }, [lastBlock, prevBlocks])

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
    const newBlock = { id: uid(), tag: 'p', html: '' }

    const index = blocks.map(b => b.id).indexOf(currentBlock.id)
    const updatedBlocks = [...blocks]
    updatedBlocks.splice(index + 1, 0, newBlock)

    setBlocks([...updatedBlocks])
    setlastBlock(currentBlock.ref)
  }

  const deleteBlockHandler = currentBlock => {
    const previousBlock = currentBlock.ref.previousElementSibling

    const index = blocks.map(b => b.id).indexOf(currentBlock.id)
    const updatedBlocks = [...blocks]
    updatedBlocks.splice(index, 1)

    setBlocks([...updatedBlocks])
    setlastBlock(previousBlock)
  }

  return (
    <Container>
      <PageContent className="page">
        {blocks.map(block => (
          <EditableBlock
            key={block.id}
            element={block}
            addBlock={addBlockHandler}
            deleteBlock={deleteBlockHandler}
            updatePage={updatePageHandler}
          />
        ))}
      </PageContent>
    </Container>
  )
}

export default EditablePage

const Container = styled.main`
  display: flex;
  align-items: start;
  justify-content: center;

  min-height: calc(100vh - 56px - 48px);
`

const PageContent = styled.article`
  width: 45rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`