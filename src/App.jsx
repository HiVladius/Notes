import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';

import Error from './Components/Error';

import axios from 'axios';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}


const App = () => {
  
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  
 

  useEffect (() => {
    noteService.getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })

    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    }

    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)
    console.log('promise made');
  }, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

    const toggleImportanceOf = id => {
     const url = `http://localhost:3001/notes/${id}`
     const note = notes.find(n => n.id === id)
     const changedNote = { ...note, important: !note.important }

     console.log(url, changedNote, note, "changeNote" );

     noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
      console.log(`importance of ${id} needs to be toggled`);
    }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')        
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const deleteNote = (id) => {
    noteService
      .remove(id)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id))
      })

      console.log(`delete ${id} needs to be toggled`);
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="font-style: italic text-3xl font-bold my-6 text-blue-400 ">Notes</h1>
      
      <Error message={errorMessage} 
      className="text color bg-red-600 background-color: red font-style: italic text-lg font-medium text-gray-700 hover:text-gray-900" 
      
      />


      <div className="mb-6">
        <button
          className="font-style: italic text-lg font-medium text-gray-700 hover:text-gray-900"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show important' : 'Show all'}
        </button>
      </div>
    <div className='overflow-y-scroll max-h-96'>
    <ul className="space-y-4">
        {Array.isArray(notesToShow) && notesToShow.map(note => (
          <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
          deleteNote = {() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
      <form onSubmit={addNote} className="flex items-center mt-6">
        <input
          value={newNote}
          onChange={handleNoteChange}
          className="w-full px-4 py-2 mr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </form>

      <Footer />
    </div>
  )
}

export default App;
