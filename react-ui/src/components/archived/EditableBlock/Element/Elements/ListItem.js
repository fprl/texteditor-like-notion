import React from 'react'
import styled from 'styled-components'

const BulletedList = props => {
  return <li {...props.attributes}>{props.children}</li>
}

export default BulletedList
