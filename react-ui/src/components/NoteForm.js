import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import noteService from '../services/notes'


const NoteForm = ({ setNewRequest, noteFormRef }) => {
  const [newNote, setNewNote] = useState('')
  const history = useHistory()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = async (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: false
    }

    try {
      await noteService
        .create(noteObject)
        .then(returnedNote => {
          setNewNote('')
          noteFormRef.current.toggleVisibility()
          history.push(`/notes/${returnedNote.id}`)
        })
    } catch (error) {
      console.log(error.response.data.error)
    }
    // setNewRequest(new Date())
  }

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          id ="new-note"
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
