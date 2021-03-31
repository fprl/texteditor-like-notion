import React from 'react'

const handleClick = (e) => {
  e.preventDefault()
  console.log('Hi')
}

const Link = ({ text, linkTo }) => <a href={linkTo} onClick={handleClick}>{text}</a>

export default Link