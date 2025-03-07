import React, { useState } from 'react';

const NoteForm = ({ note, onSubmit }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      content
    });
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="button">
        {note ? 'Update Note' : 'Create Note'}
      </button>
    </form>
  );
};

export default NoteForm;
