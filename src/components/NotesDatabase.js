import React from 'react';
import { Link } from 'react-router-dom';

function NotesDatabase({ name, description, viewsCount }) {
  return (
    <div className="database-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="database-stats">
        <span>{viewsCount} views</span>
        <Link to={`/notes/${name}`} className="button">
          Open
        </Link>
      </div>
    </div>
  );
}

export default NotesDatabase;
