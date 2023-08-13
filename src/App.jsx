import { useState, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid';

import Main from "./components/Main"
import Sidebar from "./components/Sidebar"

import './App.css'

function App() {
  const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
  const [activeNote, setActiveNote] = useState(false);


  useEffect(() => {
    // ローカルストレージにノートを保存する
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    // notesの最初のノートをアクティブにする
    if (notes.length > 0) {
      setActiveNote(notes[0].id);
    } else {
      setActiveNote(false);
    }
  }, []);

  const onAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: '',
      content: '',
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  };

  const onDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updateNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updateNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      <Sidebar onAddNote={onAddNote} notes={notes} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote} />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  )
}

export default App
