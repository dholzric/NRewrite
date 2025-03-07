import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FormList({ forms, onFormDeleted }) {
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedForms = [...forms].sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    if (sortBy === 'createdAt') {
      return sortOrder === 'asc'
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'updatedAt') {
      return sortOrder === 'asc'
        ? new Date(a.updatedAt) - new Date(b.updatedAt)
        : new Date(b.updatedAt) - new Date(a.updatedAt);
    }
    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/forms/${id}`, {
        method: 'DELETE'
      });
      onFormDeleted(id);
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  return (
    <div className="form-list">
      <div className="sort-controls">
        <label>Sort by:</label>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdAt">Created Date</option>
          <option value="updatedAt">Last Modified</option>
        </select>
        <button 
          className="button small"
          onClick={toggleSortOrder}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      {sortedForms.map(form => (
        <div key={form.id} className="form-card">
          <h3>{form.title}</h3>
          <p>{form.description}</p>
          <div className="actions">
            <Link to={`/forms/${form.id}`} className="button">
              View
            </Link>
            <button 
              className="button"
              onClick={() => handleDelete(form.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormList;
