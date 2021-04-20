import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { useOutsideMenu } from '../hooks/useOutsideMenu'

import textImage from '../images/blocks/text.png'
import h1Image from '../images/blocks/heading_1.png'
import h2Image from '../images/blocks/heading_2.png'
import h3Image from '../images/blocks/heading_3.png'

const allowedTags = [
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Text',
    placeholder: "Type '/' for commands",
    image: textImage,
  },
  {
    id: 'page-title',
    tag: 'h1',
    label: 'Heading 1',
    placeholder: 'Heading 1',
    image: h1Image,
  },
  {
    id: 'heading',
    tag: 'h2',
    label: 'Heading 2',
    placeholder: 'Heading 2',
    image: h2Image,
  },
  {
    id: 'subheading',
    tag: 'h3',
    label: 'Heading 3',
    placeholder: 'Heading 3',
    image: h3Image,
  },
]

const SelectTagMenu = ({ position: pos, handleSelection, handleCloseMenu }) => {
  const [tagList, setTagList] = useState(allowedTags)
  const [position, setPosition] = useState({ left: null, top: null })
  const [selectedTagIndex, setSelectedTagIndex] = useState(0)

  const menuRef = useRef()

  useOutsideMenu(menuRef, handleCloseMenu)

  useEffect(() => {
    const { top, left, height, width } = menuRef.current.getBoundingClientRect()
    const svgWidth = 20

    if (pos.left && pos.top) {
      setPosition({
        left: pos.left - left + svgWidth,
        top: pos.top - top,
      })
    }
  }, [])

  useEffect(() => {
    const handleOnKeyDown = e => {
      if (e.key === 'Enter') {
        e.preventDefault()
        const { tag , placeholder } = tagList[selectedTagIndex]
        handleSelection(tag, placeholder)
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (selectedTagIndex === 0) {
          setSelectedTagIndex(tagList.length - 1)
        } else {
          setSelectedTagIndex(selectedTagIndex - 1)
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (selectedTagIndex === tagList.length - 1) {
          setSelectedTagIndex(0)
        } else {
          setSelectedTagIndex(selectedTagIndex + 1)
        }
      }
    }

    const handleOnKeyUp = e => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === 'Backspace' || e.key === '/') {
        handleCloseMenu()
        return
      }
    }

    document.addEventListener('keydown', handleOnKeyDown)
    document.addEventListener('keydown', handleOnKeyUp)

    return () => {
      document.removeEventListener('keydown', handleOnKeyDown)
      document.removeEventListener('keydown', handleOnKeyUp)
    }

  }, [selectedTagIndex])

  return (
    <Menu top={position.top} left={position.left} ref={menuRef}>
      <MenuTitle>turn into</MenuTitle>
      <MenuList>
        {tagList.map(tag => {
          return (
            <ListItem
              isSelected={
                tagList.indexOf(tag) === selectedTagIndex ? 'selected' : null
              }
              key={tag.id}
              onClick={() => {
                handleSelection(tag.tag, tag.placeholder)
                handleCloseMenu()
              }}
            >
              <ItemImg src={tag.image} alt={tag.id} />
              <ItemLabel>{tag.label}</ItemLabel>
            </ListItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

export default SelectTagMenu

const Menu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 100;

  top: ${p => `${p.top}px`};
  left: ${p => `${p.left}px`};

  width: var(--width-menu);
  border-radius: 6px;

  background-color: white;
  box-shadow: 2px 2px 10px 1px var(--color-shadow);
`

const MenuTitle = styled.span`
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-gray);
  text-transform: uppercase;

  user-select: none;

  margin-top: var(--spacing-xs);
  margin-bottom: var(--spacing-xxs);
  padding: 0 var(--spacing-s);
`

const MenuList = styled.ul`
  width: 100%;

  padding: var(--spacing-xs) 0;
`

const ListItem = styled.li`
  display: flex;
  align-items: center;

  height: 2rem;

  padding: var(--spacing-xxs) var(--spacing-s);
  cursor: pointer;

  background-color: ${p => (p.isSelected ? 'var(--color-hover)' : '')};

  :hover {
    background-color: var(--color-hover);
  }

  :focus {
    background-color: var(--color-background);
  }
`

const ItemImg = styled.img`
  height: 100%;
  margin-right: var(--spacing-xs);

  border: 1px solid var(--color-border);
  border-radius: 5px;
`

const ItemLabel = styled.span`
  font-size: var(--text-sm);
`
