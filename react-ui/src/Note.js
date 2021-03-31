import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useFetch from './hooks/useFetch'
import noteService from './services/notes'

import Notification from './components/Notification'

const Note = () => {
  const [note, setNote] = useState(null)

  const { id } = useParams()
  let { response, isLoading, error } = useFetch({ url: `/api/notes/${id}`, timeOut: 500 })

  useEffect(() => {
    if (response) {
      setNote(response)
    }
  }, [response])

  const toggleImportanceOf = () => {
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNote ({ ...response, ...returnedNote })
      })
      .catch(() => {
        error = `Note '${note.content}' was already removed from server`
        setTimeout(() => {
          error = null
        }, 5000)
      })
  }

  return (
    <div>
      {isLoading &&
        <h3>Loading note...</h3>
      }

      {error && <Notification message={error}/>}

      {note &&
      <>
        <h1>Blog - {id}</h1>
        <h2>{note.content}</h2>
        <p>{note.user.username}</p>
        <p>{note.id}</p>
        <p><strong>{note.important ? 'important' : 'not important'}</strong></p>
        <button onClick={toggleImportanceOf}>{note.important ? 'make not important' : 'make important'}</button>
      </>
      }
    </div>
  )
}

export default Note
