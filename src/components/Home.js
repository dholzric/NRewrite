import React, { useState, useEffect } from 'react';
import NotesDatabase from './NotesDatabase';
import './Home.css';

function Home() {
  const [databases, setDatabases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const response = await fetch('/api/databases');
        if (!response.ok) {
          throw new Error('Failed to fetch databases');
        }
        const data = await response.json();
        setDatabases(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDatabases();
  }, []);

  if (loading) return <div>Loading databases...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      <h1>Notes Databases</h1>
      <div className="databases-grid">
        {databases.map(db => (
          <NotesDatabase
            key={db._id}
            name={db.name}
            description={db.description}
            viewsCount={db.viewsCount}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
