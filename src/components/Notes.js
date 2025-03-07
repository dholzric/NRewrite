import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleNoteCreated = async (newNote) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      const createdNote = await response.json();
      setNotes([...notes, createdNote]);
    } catch (error) {
      console.error('Error creating note:', error);
      setError(error.message);
    }
  };

  const handleFormSubmit = async (noteData) => {
    try {
      const url = editingNote ? `/api/notes/${editingNote.id}` : '/api/notes';
      const method = editingNote ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error(editingNote ? 'Failed to update note' : 'Failed to create note');
      }

      const result = await response.json();
      
      if (editingNote) {
        setNotes(notes.map(n => n.id === editingNote.id ? result : n));
      } else {
        setNotes([...notes, result]);
      }

      setShowForm(false);
      setEditingNote(null);
    } catch (error) {
      console.error('Error saving note:', error);
      setError(error.message);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      {error && <div className="error-message">{error}</div>}
      
      {showForm ? (
        <NoteForm 
          note={editingNote}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingNote(null);
          }}
        />
      ) : (
        <>
          <button 
            className="button"
            onClick={() => setShowForm(true)}
          >
            Add New Note
          </button>
          
          {loading ? (
            <div>Loading notes...</div>
          ) : (
            <div className="notes-list">
              {notes.map(note => (
                <div key={note.id} className="note-item">
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <button
                    className="button small"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Notes;
