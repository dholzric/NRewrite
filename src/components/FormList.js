import React from 'react';
import { Link } from 'react-router-dom';

function FormList({ forms, onFormDeleted }) {
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
      {forms.map(form => (
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
