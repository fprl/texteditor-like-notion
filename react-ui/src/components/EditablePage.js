import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { usePrevious } from '../hooks'
import { uid, setCaretToEnd } from '../utilities'

import PageNavbar from './PageNavbar'
import EditableInformation from './EditableInformation'
import EditableBlock from './EditableBlock'

const page = {
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
      placeholder: "Type '/' for commands",
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
}

const EditablePage = () => {
  const [pageInformation, setPageInformation] = useState(page.information)
  const [blocks, setBlocks] = useState(page.blocks)
  const [lastBlock, setlastBlock] = useState()
  const prevBlocks = usePrevious(blocks)

  useEffect(() => {
    console.group('Mount')
    console.log('previous blocks: ', prevBlocks)
    console.log('actual blocks: ', blocks)
    console.groupEnd()

    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      lastBlock &&
        lastBlock.nextElementSibling.querySelector('#content-editable').focus()
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
    const newBlock = {
      id: uid(),
      tag: 'p',
      html: '',
      placeholder: 'Type \'/\' for commands',
    }

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
      <PageNavbar title={pageInformation.title} />

      <PageInformation>
        <EditableInformation pageInformation={pageInformation} />
      </PageInformation>

      <PageDivider />

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
  flex-direction: column;
  align-items: center;
  justify-content: start;

  width: 100%;
  min-height: calc(100vh - 56px - 48px);
`

const PageInformation = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 10rem;
`

const PageDivider = styled.div`
  height: 1.5rem;
  width: 45rem;
`

const PageContent = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 45rem;

  /*   overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  } */
`
