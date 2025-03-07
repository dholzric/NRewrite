import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormDesigner({ onFormCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fields: []
  });
  const [newField, setNewField] = useState({
    label: '',
    type: 'text',
    required: false
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const createdForm = await response.json();
      onFormCreated(createdForm);
      navigate('/');
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  const addField = () => {
    if (newField.label.trim()) {
      setFormData(prev => ({
        ...prev,
        fields: [...prev.fields, newField]
      }));
      setNewField({
        label: '',
        type: 'text',
        required: false
      });
    }
  };

  return (
    <div className="form-designer">
      <h2>Create New Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Form Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label>Form Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <h3>Form Fields</h3>
        {formData.fields.map((field, index) => (
          <div key={index} className="field">
            <p>{field.label} ({field.type}) {field.required && '*'}</p>
          </div>
        ))}

        <div className="field">
          <label>New Field Label</label>
          <input
            type="text"
            value={newField.label}
            onChange={(e) => setNewField({ ...newField, label: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Field Type</label>
          <select
            value={newField.type}
            onChange={(e) => setNewField({ ...newField, type: e.target.value })}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="email">Email</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>

        <div className="field">
          <label>
            <input
              type="checkbox"
              checked={newField.required}
              onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
            />
            Required
          </label>
        </div>

        <button type="button" className="button" onClick={addField}>
          Add Field
        </button>

        <button type="submit" className="button">
          Create Form
        </button>
      </form>
    </div>
  );
}

export default FormDesigner;
