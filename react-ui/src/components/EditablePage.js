import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { usePrevious } from '../hooks'
import { uid, setCaretToEnd } from '../utilities'

import PageNavbar from './PageNavbar'
import PageHeader from './PageHeader'
import EditableBlock from './EditableBlock'

const EditablePage = ({ pages }) => {
  const [information, setInformation] = useState()
  const [blocks, setBlocks] = useState()
  const [lastBlock, setlastBlock] = useState()
  const prevBlocks = usePrevious(blocks)

  const { id } = useParams()

  useEffect(() => {
    if (pages) {
      const pageFiltered = pages.filter(page => page.information.id === id)
      const [page] = pageFiltered
      setInformation(page.information)
      setBlocks(page.blocks)
    }
  }, [id])

  useEffect(() => {
    console.group('Mount')
    console.log('previous blocks: ', prevBlocks)
    console.log('actual blocks: ', blocks)
    console.groupEnd()

    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      lastBlock && lastBlock.nextElementSibling.querySelector('.content-editable').focus()
    } else if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      lastBlock && setCaretToEnd(lastBlock.querySelector('.content-editable'))
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
    <MainContainer>
      { information && blocks &&
        <>
          <PageNavbar title={information.title} />
          <PageHeader information={information} />
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
        </>
      }

    </MainContainer>
  )
}

export default EditablePage

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  min-width: 10rem;
  width: 100%;
  min-height: calc(100vh - 56px - 48px);
`

const PageDivider = styled.div`
  height: var(--spacing-l);
`

const PageContent = styled.section`
  display: flex;
  flex-direction: column;

  min-width: 5rem;
  width: 50%;
`
