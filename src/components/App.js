import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import FormList from './FormList';
import FormDesigner from './FormDesigner';
import FormViewer from './FormViewer';

function App() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('/api/forms');
      const data = await response.json();
      setForms(data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const handleFormCreated = (newForm) => {
    setForms([...forms, newForm]);
  };

  const handleFormDeleted = (id) => {
    setForms(forms.filter(form => form.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={
              <FormList 
                forms={forms} 
                onFormDeleted={handleFormDeleted}
              />
            } />
            <Route path="/design" element={
              <FormDesigner onFormCreated={handleFormCreated} />
            } />
            <Route path="/forms/:id" element={<FormViewer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
