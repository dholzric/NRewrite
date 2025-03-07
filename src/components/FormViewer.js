import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function FormViewer() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchForm();
  }, [id]);

  const fetchForm = async () => {
    try {
      const response = await fetch(`/api/forms/${id}`);
      const data = await response.json();
      setForm(data);
      
      // Initialize form data with empty values
      const initialData = {};
      data.fields.forEach(field => {
        initialData[field.label] = field.type === 'checkbox' ? false : '';
      });
      setFormData(initialData);
    } catch (error) {
      console.error('Error fetching form:', error);
    }
  };

  const handleChange = (e, field) => {
    const value = field.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [field.label]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/forms/${id}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="form-viewer">
      <h2>{form.title}</h2>
      <p>{form.description}</p>

      {submitted ? (
        <div className="success-message">
          <h3>Thank you for your submission!</h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {form.fields.map((field, index) => (
            <div key={index} className="field">
              <label>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  value={formData[field.label] || ''}
                  onChange={(e) => handleChange(e, field)}
                  required={field.required}
                />
              ) : field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  checked={formData[field.label] || false}
                  onChange={(e) => handleChange(e, field)}
                />
              ) : (
                <input
                  type={field.type}
                  value={formData[field.label] || ''}
                  onChange={(e) => handleChange(e, field)}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default FormViewer;
