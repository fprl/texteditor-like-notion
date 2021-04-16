import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import textImage from '../images/blocks/text.png'
import h1Image from '../images/blocks/heading_1.png'
import h2Image from '../images/blocks/heading_2.png'
import h3Image from '../images/blocks/heading_3.png'

const allowedTags = [
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Text',
    placeholder: 'Type \'/\' for commands',
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

const SelectTagMenu = ({ handleSelection }) => {
  const [tagList, setTagList] = useState(allowedTags)
  const [position, setPosition] = useState({ left: null, top: null })
  const [selectedTagIndex, setSelectedTagIndex] = useState(0)

  const menuRef = useRef()

  useEffect(() => {
    const { top, left, height, width } = menuRef.current.getBoundingClientRect()
    const svgWidth = 20

    setPosition({
      left: -width - svgWidth,
      top: height / 2 - height
    })
  }, [])

  const onKeyDownHandler = () => {}

  return (
    <Menu top={position.top} left={position.left} ref={menuRef}>
      <MenuTitle>turn into</MenuTitle>
      <MenuList>
        {tagList.map(tag => {
          return (
            <MenuItemWrapper isSelected={tagList.indexOf(tag) === selectedTagIndex ? 'selected' : null} key={tag.id} onClick={() => handleSelection(tag.tag, tag.placeholder)}>
              <MenuItemImg src={tag.image} alt={tag.id} />
              <MenuItem>{tag.label}</MenuItem>
            </MenuItemWrapper>
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

const MenuItemWrapper = styled.li`
  display: flex;
  align-items: center;

  height: 2rem;

  padding: var(--spacing-xxs) var(--spacing-s);
  cursor: pointer;

  :hover {
    background-color: var(--color-hover);
  }

  :focus {
    background-color: var(--color-background);
  }
`

const MenuItemImg = styled.img`
  height: 100%;
  margin-right: var(--spacing-xs);

  border: 1px solid var(--color-border);
  border-radius: 5px;
`

const MenuItem = styled.span`
  font-size: var(--text-sm);
`
