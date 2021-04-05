import React, { useState } from 'react'
import styled from 'styled-components'
import matchSorter from 'match-sorter'

const MENU_HEIGHT = 150
const allowedTags = [
  {
    id: 'page-title',
    tag: 'h1',
    label: 'Page Title',
  },
  {
    id: 'heading',
    tag: 'h2',
    label: 'Heading',
  },
  {
    id: 'subheading',
    tag: 'h3',
    label: 'Subheading',
  },
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Paragraph',
  },
]

const SelectMenu = ({ position, closeMenu, handleSelection }) => {
  const [tagList, setTagList] = useState(allowedTags)
  const [selectedTag, setSelectedTag] = useState(0)
  const [command, setCommand] = useState('')

  return <h1></h1>
}

export default SelectMenu
