import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1>Notes Clone</h1>
        <nav>
          <Link to="/" className="button">Forms</Link>
          <Link to="/design" className="button">Create Form</Link>
          <Link to="/notes" className="button">Notes</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
