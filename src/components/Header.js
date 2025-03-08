import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1>Notes App</h1>
        <nav>
          <Link to="/" className="button">Home</Link>
          <Link to="/notes" className="button">Notes</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
