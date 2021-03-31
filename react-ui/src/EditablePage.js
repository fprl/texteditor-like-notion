import React, { useState, useEffect } from 'react'
import uid from './utilities/uid'

const initialBlock = { id: uid(), html: 'aaa', tag: 'p' }

const EditablePage = () => {
  const [blocks, setBlocks] = useState([initialBlock])

  return (
    <div className="page">
      {blocks.map( block =>
        <div contentEditable='true' key={block.id} id={block.id}>
          Tag: {block.id}, Content: {block.html}
        </div>
      )}
    </div>
  )
}

export default EditablePage
