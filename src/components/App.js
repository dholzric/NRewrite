import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import FormList from './FormList';
import FormDesigner from './FormDesigner';
import FormViewer from './FormViewer';
import '../styles/main.css';

function App() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('/api/forms');
      if (!response.ok) {
        throw new Error('Failed to fetch forms');
      }
      const data = await response.json();
      setForms(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching forms:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleFormCreated = async (newForm) => {
    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newForm),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create form');
      }

      const createdForm = await response.json();
      setForms([...forms, createdForm]);
    } catch (error) {
      console.error('Error creating form:', error);
      setError(error.message);
    }
  };

  const handleFormUpdated = async (updatedForm) => {
    try {
      const response = await fetch(`/api/forms/${updatedForm.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update form');
      }

      setForms(forms.map(form => 
        form.id === updatedForm.id ? updatedForm : form
      ));
    } catch (error) {
      console.error('Error updating form:', error);
      setError(error.message);
    }
  };

  const handleFormDeleted = async (id) => {
    try {
      const response = await fetch(`/api/forms/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete form');
      }

      setForms(forms.filter(form => form.id !== id));
    } catch (error) {
      console.error('Error deleting form:', error);
      setError(error.message);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div>Loading forms...</div>
          ) : (
            <Routes>
              <Route path="/" element={
                <FormList 
                  forms={forms} 
                  onFormDeleted={handleFormDeleted}
                />
              } />
              <Route path="/design" element={
                <FormDesigner 
                  onFormCreated={handleFormCreated}
                  onFormUpdated={handleFormUpdated}
                />
              } />
              <Route path="/forms/:id" element={
                <FormViewer 
                  forms={forms}
                  onFormUpdated={handleFormUpdated}
                />
              } />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
