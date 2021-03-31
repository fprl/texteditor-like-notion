import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import useFetch from './hooks/useFetch'

import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const Wrapper = styled.div`
  background: Bisque;
  margin-top: 1rem;
  padding: 2rem;
  border: 1px solid black;
`

const Notes = ({ user }) => {
  const [newRequest, setNewRequest] = useState(new Date())
  const [showAll, setShowAll] = useState(true)
  const { response: notes, isLoading, error } = useFetch({ url: 'api/notes', timeOut: 500 })

  const noteFormRef = useRef()
  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm setNewRequest={setNewRequest} noteFormRef={noteFormRef} />
    </Togglable>
  )

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <Wrapper>
      <h1>Notes</h1>

      <Notification message={error} />
      {<h3>{newRequest.toString()}</h3>}
      {isLoading && <h3>Loading notes...</h3>}

      {notes &&
      <>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>

        <div>
          {user ? noteForm() : ''}
        </div>

        <ul>
          {notesToShow.map((note) => (
            <li key={note.id}>
              <Link to={`/notes/${note.id}`} >{note.content}</Link>
            </li>
          ))}
        </ul>
      </>
      }
    </Wrapper>
  )
}

export default Notes
