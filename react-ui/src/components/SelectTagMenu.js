import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import matchSorter from 'match-sorter'

import textImage from '../images/blocks/text.png'
import h1Image from '../images/blocks/heading_1.png'
import h2Image from '../images/blocks/heading_2.png'
import h3Image from '../images/blocks/heading_3.png'

const allowedTags = [
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Text',
    image: textImage,
  },
  {
    id: 'page-title',
    tag: 'h1',
    label: 'Heading 1',
    image: h1Image,
  },
  {
    id: 'heading',
    tag: 'h2',
    label: 'Heading 2',
    image: h2Image,
  },
  {
    id: 'subheading',
    tag: 'h3',
    label: 'Heading 3',
    image: h3Image,
  },
]

const SelectTagMenu = ({ position, handleSelection }) => {
  const [tagList, setTagList] = useState(allowedTags)
  const [selectedTag, setSelectedTag] = useState(0)
  const [command, setCommand] = useState('')
  const [size, setSize] = useState({ height: null, width: null })

  const menuRef = useRef()

  useEffect(() => {
    const height = menuRef.current.getBoundingClientRect().height
    const width = menuRef.current.getBoundingClientRect().width
    const extra = menuRef.current.getBoundingClientRect()
    setSize({ ...size, height, width, extra })
  }, [])

  return (
    <Menu top={size.height / 2 - size.height} left={-size.width} ref={menuRef}>
      <MenuList>
        {tagList.map(tag => {
          return (
            <MenuItemWrapper key={tag.id} onClick={handleSelection}>
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
  display: flex;
  z-index: 100;

  position: absolute;
  top: ${p => `${p.top}px`};
  left: ${p => `${p.left}px`};

  width: var(--width-menu);

  background-color: white;
  box-shadow: 2px 2px 10px 1px var(--color-shadow);
`

const MenuList = styled.ul`
  width: 100%;

  padding: var(--spacing-xs) 0;
`

const MenuItemWrapper = styled.div`
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

const MenuItem = styled.li`
  font-size: var(--text-sm);
`
