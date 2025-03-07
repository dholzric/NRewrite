import React from 'react';
import ReactDOM from 'react-dom';
import ModernNotesApp from './ModernNotesApp';
import './index.css'; // Assume this includes Tailwind CSS

ReactDOM.render(
  <React.StrictMode>
    <ModernNotesApp />
  </React.StrictMode>,
  document.getElementById('root')
);