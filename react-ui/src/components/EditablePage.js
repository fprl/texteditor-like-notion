import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import { usePrevious } from '../hooks'
import { uid, setCaretToEnd } from '../utilities'

import PageNavbar from './PageNavbar'
import PageHeader from './PageHeader'
import EditableBlock from './EditableBlock'
import EditableBlockCopy from './EditableBlockCopy'

const EditablePage = ({ page, updatePage }) => {
  const [information, setInformation] = useState()
  const [blocks, setBlocks] = useState()
  const [lastBlock, setlastBlock] = useState()
  const [lastPage, setLastPage] = useState()

  const prevBlocks = usePrevious(blocks)
  const lastPageId = useParams().id

  useEffect(() => {
    if (page) {
      setInformation(page.information)
      setBlocks(page.blocks)
      setLastPage(lastPageId)
    }
  }, [page])

  useEffect(() => {
    const pageHasChanged = page ? page.information.id !== lastPage : false
    if (!pageHasChanged) {
      console.group('Mount')
      console.log('previous blocks: ', prevBlocks)
      console.log('actual blocks: ', blocks)
      console.groupEnd()

      if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
        console.dir(lastBlock)
        lastBlock && lastBlock.nextElementSibling.querySelector('.content-editable').focus()
      } else if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
        lastBlock && setCaretToEnd(lastBlock.querySelector('.content-editable'))
      }
    }
  }, [lastBlock, prevBlocks])


  const addBlockHandler = (currentBlock, multiple) => {
    const newBlock = {
      id: uid(),
      tag: 'p',
      html: '',
      placeholder: 'Type \'/\' for commands',
    }

    const currentBlockIndex = blocks.map(b => b.id).indexOf(currentBlock.id)
    const updatedBlocks = [...blocks]

    if (!multiple) {
      updatedBlocks.splice(currentBlockIndex + 1, 0, newBlock)

    } else if (multiple) {
      let newBlocks = []
      newBlocks = multiple.map(html => ({ ...newBlock, id: uid(), html }))
      updatedBlocks.splice(currentBlockIndex + 1, 0, ...newBlocks)
    }

    setBlocks([...updatedBlocks])
    currentBlock.ref && setlastBlock(currentBlock.ref)
  }

  const updateBlockHandler = updatedBlock => {
    const index = blocks.map(b => b.id).indexOf(updatedBlock.id)
    const updatedBlocks = [...blocks]
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      ...updatedBlock
    }
    setBlocks([...updatedBlocks])
  }

  const deleteBlockHandler = currentBlock => {
    const previousBlock = currentBlock.ref.previousElementSibling

    const index = blocks.map(b => b.id).indexOf(currentBlock.id)
    const updatedBlocks = [...blocks]
    updatedBlocks.splice(index, 1)

    setBlocks([...updatedBlocks])
    setlastBlock(previousBlock)
  }

  const handleOnDragEnd = result => {
    const { source, destination } = result
    if (!destination) {
      return
    }
    if (source.draggableId === destination.draggableId && source.index === destination.index) {
      return
    }

    const updatedBlocks = [...blocks]
    const [reorderedBlock] = updatedBlocks.splice(source.index, 1)
    updatedBlocks.splice(destination.index, 0, reorderedBlock)
    setBlocks([...updatedBlocks])
  }

  return (
    <PageContainer>
      { information && blocks &&
        <>
          <PageNavbar title={information.title} />
          <PageHeader information={information} />
          <PageDivider />

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='blocks'>
              {(provided) => (
                <BlocksList className="page" ref={provided.innerRef} {...provided.droppableProps}>
                  {blocks.map((block, index) => (
                    <EditableBlockCopy
                      key={block.id}
                      index={index}
                      element={block}
                      addBlock={addBlockHandler}
                      deleteBlock={deleteBlockHandler}
                      updateBlock={updateBlockHandler}
                    />
                  ))}
                  {provided.placeholder}
                </BlocksList>
              )}
            </Droppable>
          </DragDropContext>
        </>
      }

    </PageContainer>
  )
}

export default EditablePage

const PageContainer = styled.main`
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

const BlocksList = styled.ul`
  display: flex;
  flex-direction: column;

  min-width: 5rem;
  width: 50%;

  padding-bottom: 10rem;
`
